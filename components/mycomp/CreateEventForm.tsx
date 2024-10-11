import { eventSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const CreateEventForm = () => {
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(eventSchema)
    });

    return (
        <div className="p-4 pb-0">
            <form onSubmit={handleSubmit((data) => console.log(data))} className="space-y-4 my-3">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="title">Event Title</Label>
                    <Input type="text" id="title" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="description">Event Description</Label>
                    <Textarea placeholder="Type your message here." id="description" className="resize-none" rows={3}/>
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="duration">Event Duration (in minutes)</Label>
                    <Input type="number" id="duration" defaultValue={30} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label>IsPrivate Event</Label>
                    <Select defaultValue="true">
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="true">True</SelectItem>
                                <SelectItem value="false">False</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Button className="mt-4 w-full" type="submit">Create Event</Button>
            </form>
        </div>
    )
}

export default CreateEventForm