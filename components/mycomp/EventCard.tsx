"use client";
import { deleteEvent } from "@/actions/event";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useFetch from "@/hooks/useFetch";
import { Link, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventCard({event}:{event:any}) {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const { loading, error, fn:deleteEventFn } = useFetch(deleteEvent);

  async function handleDelete(){
    if(window.confirm("Are you sure you want to delete this event?")){
      await deleteEventFn(event.id);
      router.refresh();
    }
  }

  function handleCopy() {
    try{
      navigator.clipboard.writeText(`${window.location.origin}/events/${event.id}`);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <Card className="w-full max-w-[600px] h-max">
      <CardHeader>
        <CardTitle className="text-2xl capitalize">{event.title}</CardTitle>
        <CardDescription className="text-gray-500 flex justify-between gap-2">
            <p>{event.duration} | {event.isPublic ? "Public" : "Private"}</p>
            <p>0 Bookings</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{event.description}</p>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="outline" onClick={handleCopy}>
          <Link className="mr-2 h-4 w-4" />
          {isCopied ? "Copied" : "Copy Link"}
        </Button>
        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          <Trash2 className="mr-2 h-4 w-4" />
          {loading ? "Deleteing" : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  )
}