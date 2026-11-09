export interface SkillItem {
  name: string;
  level?: number; // 1-10 rating
  years?: number;
  description?: string;
}

export const normalizeSkill = (skill: string | SkillItem): SkillItem => {
  if (typeof skill === 'string') {
    return { name: skill };
  }
  return skill;
};
