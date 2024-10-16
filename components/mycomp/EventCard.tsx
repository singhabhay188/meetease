import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function EventCard({key,event,username}:{key:string,event:any,username:string}) {
  return (
    <Card className="w-full max-w-[600px] h-max" key={key}>
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
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Deploy</Button>
      </CardFooter>
    </Card>
  )
}