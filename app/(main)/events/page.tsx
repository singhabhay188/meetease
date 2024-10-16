import { getEvents } from "@/actions/event";
import EventCard from "@/components/mycomp/EventCard";
import React from "react";

const page = async () => {
  const { events, username } = await getEvents();

  if(events.length === 0){
    return <h1 className="text-4xl">No events found</h1>
  }

  return <div className="min-h-screen grid lg:grid-cols-2 gap-4 justify-items-center">
    {events.map((event) => {
      return <EventCard key={event.id} event={event} username={username} />
    })}
  </div>;
};

export default page;
