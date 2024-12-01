"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome {user?.firstName}</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <p>{window?.location.origin}/user/</p>
            <Input disabled type="email" placeholder="Email" className="w-60" value={user?.username || ''}/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
