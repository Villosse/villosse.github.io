import { readFileSync } from 'fs';
import { yaml } from 'js-yaml';
import { Portfolio } from './schema';

export const config = Portfolio.parse(load(readFileSync("config.yaml", "utf8")));