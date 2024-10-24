"use server";
import { AvailabilityDB, AvailabilityFormat } from "@/types";
import db from "@/utils/db";
import prisma from "@/utils/db";
import { auth } from "@clerk/nextjs/server";

export async function updateAvailability(data:AvailabilityFormat) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: { availability: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const availabilityData = Object.entries(data).flatMap(
    ([day, { isAvailable, startTime, endTime }]) => {
      if (isAvailable) {

        return [
          {
            day: day.toUpperCase(),
            startTime: startTime,
            endTime: endTime,
          },
        ];
      }
      return [];
    }
  );

  if (user.availability) {
    await db.availability.update({
      where: { id: user.availability.id },
      data: {
        timeGap: data.timeGap,
        days: {
          deleteMany: {},
          create: availabilityData,
        },
      },
    });
  } else {
    await db.availability.create({
      data: {
        userId: user.id,
        timeGap: data.timeGap,
        days: {
          create: availabilityData,
        },
      },
    });
  }

  return { success: true };
}

function convertAvailabilityData(cAvailability : AvailabilityDB | null): AvailabilityFormat {
  // Default availability structure
  const availabilityFormat = {
    MONDAY: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    TUESDAY: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    WEDNESDAY: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    THURSDAY: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    FRIDAY: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    SATURDAY: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    SUNDAY: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    timeGap: 0,
  };

  // If there's data from the database, populate the format
  if (cAvailability) {
    availabilityFormat.timeGap = cAvailability.timeGap;

    cAvailability.days.forEach(e => {
      if(availabilityFormat.hasOwnProperty(e.day)){
        availabilityFormat[e.day].isAvailable = true;
        availabilityFormat[e.day].startTime = e.startTime;
        availabilityFormat[e.day].endTime = e.endTime;
      }
    });
  }

  return availabilityFormat;
};

export async function getAvailability(){
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const cUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId
    }
  });
  if(!cUser) throw new Error('User not found');

  const cAvailability = await prisma.availability.findUnique({
    where: {
      userId: cUser.id
    },
    include:{
      days: true
    }
  });

  console.log('fetched availability from db is: ',cAvailability);
  const formattedAvailability = convertAvailabilityData(cAvailability);
  console.log('after formatting: ',formattedAvailability);

  return formattedAvailability;
}