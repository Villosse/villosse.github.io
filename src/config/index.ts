import { load } from 'js-yaml';
import { PortfolioSchema } from "./schema";
import { withSmartDashes } from "../utils/richtext";
import configYaml from "../../config.yaml?raw";

export const config = withSmartDashes(PortfolioSchema.parse(
    load(configYaml)
));
