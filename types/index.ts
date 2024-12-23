import { Booking } from "@prisma/client";

export type DayAvailabilityDB = {
    id: string;
    availabilityId: string;
    day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
    startTime: Date;
    endTime: Date;
};

export type AvailabilityDB = {
    id: string;
    userId: string;
    timeGap: number;
    days: DayAvailabilityDB[];
};

export type DayAvailability = {
    isAvailable: boolean;
    startTime: string;
    endTime: string;
};
  
export type AvailabilityFormat = {
    MONDAY: DayAvailability;
    TUESDAY: DayAvailability;
    WEDNESDAY: DayAvailability;
    THURSDAY: DayAvailability;
    FRIDAY: DayAvailability;
    SATURDAY: DayAvailability;
    SUNDAY: DayAvailability;
    timeGap: number;
};

export type EventCardProps = {
    key: string;
    event: any;
    isPrivatePage?: boolean;
    username: string;
}