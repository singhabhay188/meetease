import { getEvents } from "@/actions/event";
import EventCard from "@/components/mycomp/EventCard";
import React from "react";

const page = async () => {
  try{
    const { events, username} = await getEvents();

    if(events.length === 0){
      return <h1 className="text-4xl">No events found</h1>
    }
  
    return <div className="grid lg:grid-cols-2 gap-4 justify-items-center">
      {events.map((event) => {
        return <EventCard key={event.id} event={event} isPrivatePage={true} username={username}/>
      })}
    </div>;
  }
  catch(e){
    console.log(e);
    //redirect('/sign-in');
  }
};

export default page;
