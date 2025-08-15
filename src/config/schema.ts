import {z} from 'zod';

export const PortfolioSchema = z.object({
    name: z.string().min(1, "Portfolio name is required"),
    image: z.string().min(1, "Image URL is required").startsWith("/"),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;