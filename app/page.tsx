import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="p-4 bg-gradient-to-tr from-blue-50 to-white">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Manage Your Time Effectively with MeetEase
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Create events, set your availability, and let others book time
                with you seamlessly.
              </p>
            </div>
            <div className="space-x-4">
              <SignedIn>
                <Link href="/events">
                  <Button>Go to Dashboard</Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/events">
                  <Button>Get Started</Button>
                </Link>
              </SignedOut>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Key Features
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <Calendar className="h-8 w-8 mb-2" />
              <h3 className="text-xl font-bold">Event Creation</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Easily create and manage events with customizable settings.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <Clock className="h-8 w-8 mb-2" />
              <h3 className="text-xl font-bold">Availability Setting</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Set your availability with flexible time slots and recurring
                schedules.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <Users className="h-8 w-8 mb-2" />
              <h3 className="text-xl font-bold">Seamless Booking</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Allow others to book time with you effortlessly through a
                user-friendly interface.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            How It Works
          </h2>
          <ol className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            <li className="flex flex-col items-center space-y-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                1
              </span>
              <h3 className="text-xl font-bold">Sign Up</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Create your MeetEase account in minutes.
              </p>
            </li>
            <li className="flex flex-col items-center space-y-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                2
              </span>
              <h3 className="text-xl font-bold">Set Availability</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Define your available time slots and preferences.
              </p>
            </li>
            <li className="flex flex-col items-center space-y-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                3
              </span>
              <h3 className="text-xl font-bold">Share & Book</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Share your booking link and let others schedule meetings with
                you.
              </p>
            </li>
          </ol>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Simplify Your Scheduling?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Join thousands of professionals who trust MeetEase to manage
                their time effectively.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <SignedIn>
                <Link href="/events">
                  <Button className="w-full">Go to Dashboard</Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/events">
                  <Button className="w-full">Get Started for Free</Button>
                </Link>
              </SignedOut>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                No credit card required. 14-day free trial.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
