"use server";
import db  from "@/utils/db";

export async function getUserByUsername(username: string) {
  const user = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      events: {
        where: {
            isPublic: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          isPublic: true,
          _count: {
            select: { bookings: true },
          },
        },
      },
    },
  });

  return user;
}