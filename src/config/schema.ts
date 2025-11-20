import { z } from 'zod';

const PersonalSchema = z.object({
    name: z.string().min(1, "Name is required"),
    surname: z.string().min(1, "Surname is required"),
    nickname: z.string().min(1, "Nickname is required"),
    title: z.string().min(1, "Title is required"),
    image: z.string().min(1, "Image URL is required").startsWith("/"),
    favicon: z.string().min(1, "Favicon URL is required").startsWith("/"),
    description: z.string().min(1, "Description is required"),
});

const ContactSchema = z.object({
    email: z.string().email("Valid email is required").optional(),
    github: z.string().url("Valid GitHub URL is required").optional(),
    linkedin: z.string().url("Valid LinkedIn URL is required").optional(),
    website: z.string().url("Valid website URL is required").optional(),
    twitter: z.string().url("Valid Twitter URL is required").optional(),
    discord: z.string().optional(),
    telegram: z.string().optional(),
    phone: z.string().optional(),
    resume: z.string().url("Valid resume URL is required").optional(),
}).catchall(z.string().optional()); // Allow any additional contact fields

const ProjectSchema = z.object({
    title: z.string().min(1, "Project title is required"),
    description: z.string().min(1, "Project description is required"),
    tech: z.array(z.string()).min(1, "At least one technology is required"),
    github: z.string().url("Valid GitHub URL is required").optional(),
    demo: z.string().url("Valid demo URL is required").optional(),
});

const ExperienceSchema = z.object({
    company: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    duration: z.string().min(1, "Duration is required"),
    description: z.string().min(1, "Description is required"),
});

const EducationSchema = z.object({
    institution: z.string().min(1, "Institution name is required"),
    degree: z.string().min(1, "Degree is required"),
    year: z.string().min(1, "Year is required"),
    description: z.string().optional(),
});

const SkillSchema = z.union([
    z.string(), // Simple string for backward compatibility
    z.object({
        name: z.string().min(1, "Skill name is required"),
        level: z.number().min(1).max(10, "Level must be between 1 and 10").optional(),
        years: z.number().min(0).optional(),
        description: z.string().optional(),
    })
]);

export const PortfolioSchema = z.object({
    personal: PersonalSchema,
    contact: ContactSchema,
    skills: z.array(SkillSchema).min(1, "At least one skill is required"),
    projects: z.array(ProjectSchema).min(1, "At least one project is required"),
    experience: z.array(ExperienceSchema).min(1, "At least one experience is required"),
    education: z.array(EducationSchema).min(1, "At least one education entry is required"),
});

export type PortfolioConfig = z.infer<typeof PortfolioSchema>;