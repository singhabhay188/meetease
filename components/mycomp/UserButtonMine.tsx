"use client";

import { UserButton } from "@clerk/nextjs";
import { ChartNoAxesColumn, User } from "lucide-react";

const UserButtonMine = () => {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-10 h-10",
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          labelIcon={<ChartNoAxesColumn size={15} />}
          label="My Events"
          href="/events"
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserButtonMine;
