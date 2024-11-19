"use server";

import { eventSchema } from "@/lib/validation";
import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { Booking } from "@prisma/client";
import { startOfDay, addDays, format, parseISO, isBefore, addMinutes, } from "date-fns";

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

export async function getEventAvailability(eventId:string){
    const event = await db.event.findUnique({
        where: {
            id:eventId
        },
        include: {
            user:{
                include: {
                    availability: {
                        select: {
                            days: true,
                            timeGap: true
                        }
                    },
                    bookings: true
                }
            }
        }
    });

    if(!event || !event.user.availability) return [];

    const { bookings, availability } = event.user;

    const startDate = startOfDay(new Date());
    const endDate = addDays(startDate,30);

    const availableDates = [];

    for(let date = startDate; date <= endDate; date = addDays(date,1)){
        const dayOfWeek = format(date,"EEEE").toUpperCase();
        const dayAvailability = availability.days.find(day => day.day === dayOfWeek);

        if(!dayAvailability) continue;

        const dateStr = format(date,"yyyy-MM-dd");

        const slots = generateSlots(
            dayAvailability.startTime,
            dayAvailability.endTime,
            availability.timeGap,
            event.duration,
            bookings,
            dateStr,
        );

        availableDates.push({
            date: dateStr,
            slots
        });
    }

    return availableDates;
}

function generateSlots(startTime:Date, endTime:Date, timeGap:number=0, duration:number, bookings:Booking[], date:string){
  const slots = [];
  let currentTime = parseISO(
    `${date}T${startTime.toISOString().slice(11, 16)}`
  );
  const slotEndTime = parseISO(
    `${date}T${endTime.toISOString().slice(11, 16)}`
  );

  // If the date is today, start from the next available slot after the current time
  const now = new Date();
  if (format(now, "yyyy-MM-dd") === date) {
    currentTime = isBefore(currentTime, now)
      ? addMinutes(now, timeGap)
      : currentTime;
  }

  while (currentTime < slotEndTime) {
    const slotEnd = new Date(currentTime.getTime() + duration * 60000);

    const isSlotAvailable = !bookings.some((booking) => {
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      return (
        (currentTime >= bookingStart && currentTime < bookingEnd) ||
        (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
        (currentTime <= bookingStart && slotEnd >= bookingEnd)
      );
    });

    if (isSlotAvailable) {
        let tempDate = currentTime;
        tempDate.setMinutes(tempDate.getMinutes() + 30);
        tempDate.setHours(tempDate.getHours() + 5);     //converting to Indian time zone
        
        slots.push(format(tempDate, "HH:mm"));
    }

    currentTime = slotEnd;
  }

  return slots;
}