import Link from "next/link";
import { Button } from "../ui/button";
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image";
import { PenBox } from "lucide-react";

export default function Header(){
    return (
      <nav className="w-full p-4 flex justify-between max-w-screen-2xl mx-auto items-center border-b-2 shadow-sm">
        <Link href="/" className="text-2xl font-semibold">
            <Image src="/logo.png" height={70} width={70} alt='Meet Ease'/>
        </Link>
        <div className="flex items-end sm:items-center flex-col sm:flex-row gap-4">
            <Link href='/events'>
                <Button className="flex items-center gap-2"><PenBox size={20}/> Create Event</Button>
            </Link>
            <Button variant='outline'>Login</Button>
        </div>
      </nav>
    )
  }
  