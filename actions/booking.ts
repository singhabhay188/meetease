"use server";
import prisma from "@/utils/db";
import { Booking } from "@prisma/client";

type bookingType = {
    eventId: string,
    name: string,
    email: string,
    startTime: string,
    endTime: string,
    additionalInfo: string | null
}

export async function createBooking(bookingData: bookingType) {
    try {
      // Fetch the event and its creator
      const event = await prisma.event.findUnique({
        where: { id: bookingData.eventId },
        include: { user: true },
      });
  
      if (!event) {
        throw new Error("Event not found");
      }
  
      // Create Google Meet link
      const meetLink = "https://meet.google.com/";
  
      // Create booking in database
      const booking:Booking = await prisma.booking.create({
        data: {
          eventId: event.id,
          userId: event.userId,
          name: bookingData.name,
          email: bookingData.email,
          startTime: bookingData.startTime,
          endTime: bookingData.endTime,
          googleEventId: "",
          additionalInfo: bookingData.additionalInfo,
          meetLink
        },
      });
  
      return  booking;
    } catch (error:any) {
      console.error("Error creating booking:", error);
      return null
    }
  }