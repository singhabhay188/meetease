"use client";

import { BarChart, Calendar, Clock, Users } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/meetings", label: "Meetings", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
];

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { isLoaded } = useUser();
  const [title, setTitle] = useState("Dashboard");
  const pathname = usePathname();

  useEffect(() => {
    setTitle(
      navItems.find((item) => item.href == pathname)?.label || "Dashboard"
    );
    document.title = `MeetEase - ${title}`;
  }, []);

  return (
    <>
      {!isLoaded && <BarLoader width="100%" color="#36d7b7" />}
      <div className="flex h-screen">
        <aside className="hidden md:block h-full border-r-2 border-blue-100">
          <nav className="mt-8">
            <ul className="space-y-1">
              {navItems.map((item, ind) => {
                return (
                  <li
                    key={ind}
                    className={`p-3 flex gap-2 items-center text-gray-600 ${
                      pathname === item.href ? "bg-blue-100" : ""
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <Link href={item.href} className="w-32">
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-3">
          <h2 className="text-blue-500 font-bold text-4xl mb-3 max-md:text-center">
            {title}
          </h2>
          {children}
        </main>
      </div>

      <nav className="mt-8 md:hidden border-t-2 border-blue-100 bg-white fixed bottom-0 left-0 right-0">
        <ul className="flex gap-2 justify-between">
          {navItems.map((item, ind) => {
            return (
              <li
                key={ind}
                className={`p-3 flex flex-col items-center text-gray-600 ${
                  pathname === item.href ? "bg-blue-100" : ""
                }`}
              >
                <item.icon className="w-5 h-5" />
                <Link href={item.href}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default AppLayout;
