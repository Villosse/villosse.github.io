import { load } from 'js-yaml';
import { PortfolioSchema } from "./schema";
import configYaml from "../../config.yaml?raw";

export const config = PortfolioSchema.parse(
    load(configYaml)
);