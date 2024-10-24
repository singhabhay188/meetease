"use server";

import { eventSchema } from "@/lib/validation";
import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";

export async function createEvent(data:Event){

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

export async function getEvents(){
    const { userId } = auth();
    if(!userId) throw new Error("User not authenticated");

    const cUser = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    });

    if(!cUser) throw new Error("User not found");

    const events = await db.event.findMany({
        where: { userId: cUser.id },
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { bookings: true }
            }
        }
    });

    return { events, username:cUser.username };
}

export async function deleteEvent(eventId:string){
    const { userId } = auth();
    if(!userId) throw new Error("User not authenticated");

    const cUser = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    });

    if(!cUser) throw new Error("User not found");

    const event = await db.event.findUnique({
        where: { id: eventId }
    });

    if(!event || event?.userId !== cUser.id) throw new Error("Event not found or Unauthorized");

    await db.event.delete({
        where: { id: eventId }
    });

    return {sucess:true}
}