import React from "react";
import prisma from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { AvailabilityDB, AvailabilityFormat } from "@/types";
import Availability from "@/components/mycomp/Availability";

const page = async () => {
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

  const { userId } = auth();
  if(!userId) return <p>Not authenticated</p>;

  const cAvailability = await prisma.availability.findUnique({
    where:{
      userId: userId
    },
    include:{
      days: true
    }
  });

  console.log('fetched availability from db is: ',cAvailability);
  const formattedAvailability = convertAvailabilityData(cAvailability);
  console.log('after formatting: ',formattedAvailability);

  return <div className="min-h-screen">
    <Availability data={formattedAvailability} />
  </div>;
};

export default page;
