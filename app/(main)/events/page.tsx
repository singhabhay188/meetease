import { getEvents } from "@/actions/event";
import EventCard from "@/components/mycomp/EventCard";
import React from "react";

const page = async () => {
  const events = await getEvents();

  if(events.length === 0){
    return <h1 className="text-4xl">No events found</h1>
  }

  return <div className="grid lg:grid-cols-2 gap-4 justify-items-center">
    {events.map((event) => {
      return <EventCard key={event.id} event={event}/>
    })}
  </div>;
};

export default page;
