{
    description = "My portfolio website";
    inputs = {
nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    futils.url = "github:numtide/flake-utils";

    };

    outputs = {
    self,
    nixpkgs,
    futils,
    }@inputs:
    let
        inherit (nixpkgs) lib;
        inherit (lib) recursiveUpdate;
        inherit (futils.lib) eachDefaultSystem defaultSystems;

        nixpkgsFor = lib.genAttrs defaultSystems (system: import nixpkgs {
            inherit system;
        }
        );
        in
        (
        eachDefaultSystem (
              system:
              let
                pkgs = nixpkgsFor.${system};
              in
              {
                apps.default = {
                  type = "app";
                  program = toString (pkgs.writeShellScript "dev" ''
                    yarn install
                    yarn dev
                  '');
                };

                devShell = pkgs.mkShell {
                  buildInputs = with pkgs; [
                    git
                    pre-commit
                    nodejs_24
                    yarn
                    typst
                    zip
                  ];
                  shellHook = ''
                    #Install dependencies
                    yarn install --prod
                  '';
                };
                }
                ));
}