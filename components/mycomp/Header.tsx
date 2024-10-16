import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import UserButtonMine from "./UserButtonMine";
import { checkUser } from "@/utils/checkUser";
import CreateEventDrawer from "@/components/mycomp/CreateEventDrawer";

export default async function Header() {
  //await checkUser();

  return (
    <nav className="w-full p-4 flex justify-between max-w-screen-2xl mx-auto items-center border-b-2 shadow-sm">
      <Link href="/" className="text-2xl font-semibold">
        <Image src="/logo.png" height={70} width={70} alt="Meet Ease" />
      </Link>
      <div className="flex items-end sm:items-center flex-col sm:flex-row gap-4">
        <SignedIn>
          <CreateEventDrawer />
          <UserButtonMine />
        </SignedIn>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline">Login</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
