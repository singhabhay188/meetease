"use client";

import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import CreateEventForm from "./CreateEventForm";
import { useState } from "react";

export default function DrawerDemo() {
    const [isOpen, setIsOpen] = useState(false);

    function handleClose() {
        setIsOpen(false);
    }
    function handleOpen() {
        setIsOpen(true);
    }

    return (
        <Drawer open={isOpen} onClose={handleClose}>
            <DrawerTrigger asChild>
                <Button variant="outline" onClick={handleOpen}>Create Event</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                        <DrawerTitle>Creating a New Event</DrawerTitle>
                    </DrawerHeader>
                    
                    <CreateEventForm closeDrawer={handleClose}/>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline" onClick={handleClose}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}