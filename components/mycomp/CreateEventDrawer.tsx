"use client";
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import CreateEventForm from "./CreateEventForm";

export default function DrawerDemo() {

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Create Event</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                        <DrawerTitle>Creating a New Event</DrawerTitle>
                    </DrawerHeader>
                    
                    <CreateEventForm />

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}