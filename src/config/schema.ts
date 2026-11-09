import { z } from 'zod';

const PersonalSchema = z.object({
    name: z.string().min(1, "Name is required"),
    surname: z.string().min(1, "Surname is required"),
    nickname: z.string().min(1, "Nickname is required"),
    title: z.string().min(1, "Title is required"),
    image: z.string().min(1, "Image URL is required").startsWith("/"),
    favicon: z.string().min(1, "Favicon URL is required").startsWith("/"),
    description: z.string().min(1, "Description is required"),
    url: z.string().url("Valid site URL is required").optional(),
    ogImage: z.string().startsWith("/").optional(),
    location: z.string().optional(),
    citizenship: z.string().optional(),
    summary: z.string().optional(),
});

// A bullet point, optionally with one level of sub-bullets.
const HighlightSchema = z.union([
    z.string(),
    z.object({
        text: z.string().min(1, "Highlight text is required"),
        items: z.array(z.string()),
    }),
]);

// Set to false to show an entry on the website only, not in the resume.
const ResumeFlag = z.boolean().default(true);

const ContactSchema = z.object({
    email: z.string().email("Valid email is required").optional(),
    github: z.string().url("Valid GitHub URL is required").optional(),
    linkedin: z.string().url("Valid LinkedIn URL is required").optional(),
    website: z.string().url("Valid website URL is required").optional(),
    twitter: z.string().url("Valid Twitter URL is required").optional(),
    discord: z.string().optional(),
    telegram: z.string().optional(),
    phone: z.string().optional(),
    resume: z.union([z.string().url(), z.string().startsWith("/")], "Valid resume URL or path is required").optional(),
}).catchall(z.string().optional()); // Allow any additional contact fields

const ProjectSchema = z.object({
    title: z.string().min(1, "Project title is required"),
    description: z.string().min(1, "Project description is required"),
    tech: z.array(z.string()).min(1, "At least one technology is required"),
    github: z.string().url("Valid GitHub URL is required").optional(),
    demo: z.string().url("Valid demo URL is required").optional(),
    role: z.string().optional(),
    date: z.string().optional(),
    link: z.string().url("Valid link URL is required").optional(),
    highlights: z.array(HighlightSchema).optional(),
    resume: ResumeFlag,
});

const ExperienceSchema = z.object({
    company: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    duration: z.string().min(1, "Duration is required"),
    location: z.string().optional(),
    description: z.string().optional(),
    highlights: z.array(HighlightSchema).optional(),
    resume: ResumeFlag,
});

const EducationSchema = z.object({
    institution: z.string().min(1, "Institution name is required"),
    degree: z.string().min(1, "Degree is required"),
    year: z.string().min(1, "Year is required"),
    location: z.string().optional(),
    description: z.string().optional(),
    highlights: z.array(HighlightSchema).optional(),
    resume: ResumeFlag,
});

const VolunteeringSchema = z.object({
    organization: z.string().min(1, "Organization is required"),
    description: z.string().min(1, "Description is required"),
    duration: z.string().min(1, "Duration is required"),
    highlights: z.array(HighlightSchema).optional(),
    resume: ResumeFlag,
});

const SkillGroupSchema = z.object({
    name: z.string().min(1, "Skill group name is required"),
    items: z.array(z.string()).min(1, "At least one item is required"),
});

export const PortfolioSchema = z.object({
    personal: PersonalSchema,
    contact: ContactSchema,
    skills: z.array(SkillGroupSchema).min(1, "At least one skill group is required"),
    projects: z.array(ProjectSchema).min(1, "At least one project is required"),
    experience: z.array(ExperienceSchema).min(1, "At least one experience is required"),
    education: z.array(EducationSchema).min(1, "At least one education entry is required"),
    volunteering: z.array(VolunteeringSchema).optional(),
});

export type Highlight = z.infer<typeof HighlightSchema>;

export type PortfolioConfig = z.infer<typeof PortfolioSchema>;