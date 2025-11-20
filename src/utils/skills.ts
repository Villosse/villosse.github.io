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

export const getSkillBarColor = (level?: number): string => {
  if (!level) return 'bg-gray-200';
  
  if (level >= 9) return 'bg-emerald-500'; // Expert (9-10)
  if (level >= 7) return 'bg-blue-500';    // Advanced (7-8)
  if (level >= 5) return 'bg-yellow-500';  // Intermediate (5-6)
  if (level >= 3) return 'bg-orange-500';  // Beginner (3-4)
  return 'bg-red-500';                     // Novice (1-2)
};

export const getSkillCardColor = (level?: number): string => {
  if (!level) return 'bg-card border-border';
  
  if (level >= 9) return 'bg-card border-emerald-200';
  if (level >= 7) return 'bg-card border-blue-200';
  if (level >= 5) return 'bg-card border-yellow-200';
  if (level >= 3) return 'bg-card border-orange-200';
  return 'bg-card border-red-200';
};

export const getSkillLevelText = (level?: number): string => {
  if (!level) return '';
  
  if (level >= 9) return 'Expert';
  if (level >= 7) return 'Advanced';
  if (level >= 5) return 'Intermediate';
  if (level >= 3) return 'Beginner';
  return 'Novice';
};