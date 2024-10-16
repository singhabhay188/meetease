"use server";

import { eventSchema } from "@/lib/validation";
import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";

export async function createEvent(data:Event){
    await new Promise(resolve => setTimeout(resolve, 4000));

    const { userId } = auth();
    if(!userId) throw new Error("User not authenticated");

    const validatedData = eventSchema.parse(data);

    const cUser = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    });

    if(!cUser) throw new Error("User not found");

    const event = await db.event.create({
        data: {
            ...validatedData,
            userId: cUser.id
        }
    });

    return event;
}