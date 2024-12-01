import React from "react";
import Availability from "@/components/mycomp/Availability";
import { getAvailability } from "@/actions/availability";

const Page = async () => {
  const availability = await getAvailability();

  return (
    <div className="min-h-screen">
      <Availability data={availability} />
    </div>
  );
};

export default Page;