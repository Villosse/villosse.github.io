// Inline markup allowed in config.yaml text fields: **bold** and [label](url).
export type RichToken =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'link'; text: string; href: string };

const MARKUP = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export const parseRichText = (s: string): RichToken[] => {
  const tokens: RichToken[] = [];
  let last = 0;
  for (const m of s.matchAll(MARKUP)) {
    if (m.index > last) tokens.push({ type: 'text', text: s.slice(last, m.index) });
    if (m[1] !== undefined) tokens.push({ type: 'bold', text: m[1] });
    else tokens.push({ type: 'link', text: m[2], href: m[3] });
    last = m.index + m[0].length;
  }
  if (last < s.length) tokens.push({ type: 'text', text: s.slice(last) });
  return tokens;
};

// Escape every character with a meaning in Typst markup.
export const escapeTypst = (s: string): string => s.replace(/[\\/[\]{}#*_+=~`$<>@-]/g, '\\$&');

export const typstString = (s: string): string => `"${s.replace(/[\\"]/g, '\\$&')}"`;

export const toTypst = (s: string): string =>
  parseRichText(s)
    .map((t) => {
      switch (t.type) {
        case 'text': return escapeTypst(t.text);
        case 'bold': return `*${escapeTypst(t.text)}*`;
        case 'link': return `#link(${typstString(t.href)})[${escapeTypst(t.text)}]`;
      }
    })
    .join('');

// Typographic dashes: "---" -> em dash, "--" -> en dash.
export const smartDashes = (s: string): string => s.replace(/---/g, '—').replace(/--/g, '–');

// Apply smartDashes to every string in the config, except URLs, paths and the
// personal name fields (whose "--" is a literal double hyphen).
const LITERAL_KEYS = new Set(['name', 'surname', 'nickname']);
const isUrlOrPath = (s: string) => /^(\w+:|\/)/.test(s);

export const withSmartDashes = <T>(value: T, key?: string, parent?: string): T => {
  if (typeof value === 'string')
    return (isUrlOrPath(value) || (parent === 'personal' && LITERAL_KEYS.has(key ?? '')) ? value : smartDashes(value)) as T;
  if (Array.isArray(value)) return value.map((v) => withSmartDashes(v, undefined, parent)) as T;
  if (value && typeof value === 'object')
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withSmartDashes(v, k, key)])) as T;
  return value;
};
