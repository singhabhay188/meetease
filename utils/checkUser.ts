import { clerkClient, currentUser } from "@clerk/nextjs/server";
import prisma from "./db";

export async function checkUser() {
  console.log("Check User called");
  let user = await currentUser();

  if (!user) {
    console.log("No user found");
    return null;
  }

  try {
    console.log(user.id);
    const dbUser = await prisma.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (dbUser) {
      console.log("User found in database");
      return dbUser;
    }

    //before creating update username becuase initial username is null for a user
    if (!user.username) {
      let name = user.firstName;
      if (!name) name = "anonymous";

      //to create a unique username for the user we are using its name and last 5 digits of its id
      user = await clerkClient().users.updateUser(user.id, {
        username: name + user.id.slice(-5),
      });
    }

    // Create user in database
    console.log('creating database user');
    const ndbUser = await prisma.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        username: user.username || "",
        imageUrl: user.imageUrl,
        name: user.firstName || "Anonymous",
      },
    });

    return ndbUser;
  } catch (e) {
    console.error(e);
  }
}
