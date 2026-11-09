// Shared by the site (src/config/index.ts), scripts/resume.ts and vite.config.ts.
// Imports carry .ts extensions so Node can run this file directly.
import { load } from 'js-yaml';
import { PortfolioSchema } from './schema.ts';
import { withSmartDashes } from '../utils/richtext.ts';

// Build the validated config from config.yaml, whose `projects` lists project
// names in display order, and the matching projects/<name>.yaml files.
export const loadConfig = (configYaml: string, readProject: (slug: string) => string | undefined) => {
    const raw = load(configYaml) as Record<string, unknown>;
    if (!Array.isArray(raw.projects)) {
        throw new Error('config.yaml: `projects` must be a list of project names (files in projects/)');
    }
    const projects = raw.projects.map((name) => {
        const slug = String(name);
        const text = readProject(slug);
        if (text === undefined) throw new Error(`config.yaml lists project "${slug}" but projects/${slug}.yaml does not exist`);
        return { ...(load(text) as object), slug };
    });
    return withSmartDashes(PortfolioSchema.parse({ ...raw, projects }));
};

export type Config = ReturnType<typeof loadConfig>;
