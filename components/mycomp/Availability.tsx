'use client'
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AvailabilityFormat } from "@/types";

const timeSlots = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
    "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",
];

export default function Availability({ data }: { data: AvailabilityFormat }) {
    const [availability, setAvailability] = useState<AvailabilityFormat>(data);

    const handleDayToggle = (day: keyof AvailabilityFormat) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                isAvailable: !prev[day].isAvailable,
            },
        }));
    };

    const handleTimeChange = (day: keyof AvailabilityFormat, type: 'startTime' | 'endTime', value: string) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [type]: value,
            },
        }));
    };

    return (
        <div className='space-y-4'>
            {Object.entries(availability)
                .filter(([key]) => key !== 'timeGap')
                .map(([day, data]) => (
                    <div key={day} className="flex items-center space-x-4">
                        <Checkbox
                            id={day}
                            checked={data.isAvailable}
                            onCheckedChange={() => handleDayToggle(day as keyof AvailabilityFormat)}
                        />
                        <div className="flex-1 space-y-2">
                            <Label htmlFor={day} className="text-base font-medium text-gray-900">
                                {day.charAt(0) + day.slice(1).toLowerCase()} {/* Properly format day */}
                            </Label>
                            {data.isAvailable && (
                                <div className="flex space-x-4">
                                    <Select
                                        value={data.startTime}
                                        onValueChange={(value) => handleTimeChange(day as keyof AvailabilityFormat, 'startTime', value)}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Start Time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timeSlots.map((time) => (
                                                <SelectItem key={time} value={time}>
                                                    {time}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        value={data.endTime}
                                        onValueChange={(value) => handleTimeChange(day as keyof AvailabilityFormat, 'endTime', value)}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="End Time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timeSlots.map((time) => (
                                                <SelectItem key={time} value={time}>
                                                    {time}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
}
