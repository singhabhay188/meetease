"use client";
import { Event, eventSchema } from "@/lib/validation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import { createEvent } from "@/actions/event";
import { useRouter } from "next/navigation";

const CreateEventForm = ({closeDrawer}:{closeDrawer:()=> void}) => {
    const router = useRouter();

    const { control, register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: '',
            description: '',
            duration: 30,
            isPublic: true
        }
    });

    const { error, fn:fnCreateEvent } = useFetch(createEvent);

    const onSubmit = async (data:Event) => {
        console.log(
            'submitting'
        )
        await fnCreateEvent(data);
        closeDrawer();
        router.refresh();
    }

    return (
        <div className="p-4 pb-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-3">
                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
                    <Input type="text" id="title" {...register("title")} />
                    {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Event Description</label>
                    <Textarea placeholder="Type your message here." id="description" className="resize-none" rows={3} {...register("description")} />
                    {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Event Duration (in minutes)</label>
                    <Input type="number" id="duration" defaultValue={30} {...register("duration", { valueAsNumber: true })} />
                    {errors.duration && <span className="text-red-500 text-sm">{errors.duration.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Event Privacy</label>
                    <Controller
                        name="isPublic"
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value==true ? 'public' : 'private'} onValueChange={(value) => field.onChange(value === 'public')}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Event Privacy</SelectLabel>
                                        <SelectItem value="public">Public</SelectItem>
                                        <SelectItem value="private">Private</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
                
                {error && <p className="text-red-500 text-sm text-center my-2">An Error Occured while Creating Event</p>}
                <Button type="submit" disabled={isSubmitting} className="mt-4 w-full">{ isSubmitting ? 'Creating...' : 'Create Event'}</Button>
            </form>
        </div>
    );
}

export default CreateEventForm;