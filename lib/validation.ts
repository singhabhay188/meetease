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

export const bookingSchema = z.object({
    name: z.string().min(1,"Name is required"),
    email: z.string().email("Invalid email"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/,"Invalid date format"),
    time: z.string().regex(/^\d{2}:\d{2}$/,"Invalid time format"),
    additionalInfo: z.string().optional()
});

export type Event = z.infer<typeof eventSchema>;
export type Booking = z.infer<typeof bookingSchema>;