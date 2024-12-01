import { getEventDetails } from "@/actions/event";
import { notFound } from "next/navigation";
import EventDetails from "./components/EventDetails";
import BookingForm from "./components/BookingForm";

export default async function EventPage({params}:{params:{eventId:string,username:string}}) {
  //const availability = await getEventAvailability(params.eventId);
  const availability = [
    {
      "date": "2024-11-19",
      "slots": []
    },
    {
      "date": "2024-11-25",
      "slots": [
        "09:00", "10:00",
        "11:00", "12:00",
        "13:00", "14:00",
        "15:00", "16:00"
      ]
    },
    {
      "date": "2024-11-26",
      "slots": [
        "09:00", "10:00", "11:00"
      ]
    },
    {
      "date": "2024-12-02",
      "slots": [
        "09:00", "10:00",
        "11:00", "12:00",
        "13:00", "14:00",
        "15:00", "16:00"
      ]
    },
    {
      "date": "2024-12-03",
      "slots": [
        "09:00", "10:00", "11:00"
      ]
    },
    {
      "date": "2024-12-09",
      "slots": [
        "09:00", "10:00",
        "11:00", "12:00",
        "13:00", "14:00",
        "15:00", "16:00"
      ]
    },
    {
      "date": "2024-12-10",
      "slots": [
        "09:00", "10:00", "11:00"
      ]
    },
    {
      "date": "2024-12-16",
      "slots": [
        "09:00", "10:00",
        "11:00", "12:00",
        "13:00", "14:00",
        "15:00", "16:00"
      ]
    },
    {
      "date": "2024-12-17",
      "slots": [
        "09:00", "10:00", "11:00"
      ]
    }
  ]

  const event = await getEventDetails(params.username, params.eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex flex-col justify-center lg:flex-row px-4 py-8 gap-6">
      <EventDetails event={event} />
      <BookingForm event={event} availability={availability} />
    </div>
  );
}