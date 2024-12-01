"use server";
import { AvailabilityDB, AvailabilityFormat } from "@/types";
import db from "@/utils/db";
import prisma from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { DayInWeek } from "@prisma/client";

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
    ([day, value]) => {

      if(typeof value === 'number') return [];

      const { isAvailable, startTime, endTime } = value;

      if (isAvailable) {

        const cStartTime = new Date('2000-01-01');
        cStartTime.setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]), 0, 0);
        const cEndTime = new Date('2000-01-01');
        cEndTime.setHours(parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1]), 0, 0);

        return [
          {
            day: day.toUpperCase() as DayInWeek,
            startTime: cStartTime.toISOString(),
            endTime: cEndTime.toISOString(),
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

function convertDateToInd(date:Date){
  let ndate = new Date(date);
  ndate.setMinutes(ndate.getMinutes() + 30);
  ndate.setHours(ndate.getHours() + 5);
  
  return ndate.toISOString().split('T')[1].substring(0,5);
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
        availabilityFormat[e.day].startTime = convertDateToInd(e.startTime);
        availabilityFormat[e.day].endTime = convertDateToInd(e.endTime);
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
  const formattedAvailability = convertAvailabilityData(cAvailability);
  return formattedAvailability;
}