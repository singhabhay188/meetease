import {z} from 'zod';

export const eventSchema = z.object({
    title: z.
        string()
        .min(3,"Title is too short")
        .max(100,"Title is too long"),
    description: z
        .string()
        .min(10,"Description is too short")
        .max(500,"Description is too long"),
    duration: z
        .number()
        .int()
        .positive()
        .max(720,"Select a duration less than 12 hours"),
    isPublic: z.boolean()
});

export type Event = z.infer<typeof eventSchema>;