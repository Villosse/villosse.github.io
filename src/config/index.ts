import { loadConfig } from './load';
import configYaml from '../../config.yaml?raw';

const projectFiles = import.meta.glob<string>('../../projects/*.yaml', { query: '?raw', import: 'default', eager: true });

export const config = loadConfig(configYaml, (slug) => projectFiles[`../../projects/${slug}.yaml`]);
