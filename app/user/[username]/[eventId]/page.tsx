"use client";

export default function EventPage({params}:{params:{eventId:string,username:string}}) {
  return (
  <div className="min-h-screen p-4">
    EventPage {params.eventId} {params.username}
  </div>
  );
}
