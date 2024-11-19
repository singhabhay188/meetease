import { getEventAvailability } from "@/actions/event";

export default async function EventPage({params}:{params:{eventId:string,username:string}}) {
  //const availableDates = await getEventAvailability(params.eventId);
  const availableDates = [
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

  return (
    <div className="min-h-screen p-4">
      EventPage {params.eventId} {params.username}
    </div>
  );
}
