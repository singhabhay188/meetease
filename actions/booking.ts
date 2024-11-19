"use server";
import prisma from "@/utils/db";

type bookingType = {
    eventId: string,
    name: string,
    email: string,
    startTime: string,
    endTime: string,
    additionalInfo: string | null
}

export async function createBooking(bookingData: bookingType) {
    try {
      // Fetch the event and its creator
      const event = await prisma.event.findUnique({
        where: { id: bookingData.eventId },
        include: { user: true },
      });
  
      if (!event) {
        throw new Error("Event not found");
      }
  
      // Create Google Meet link
      const meetLink = "https://meet.google.com/";
  
      // Create booking in database
      const booking = await prisma.booking.create({
        data: {
          eventId: event.id,
          userId: event.userId,
          name: bookingData.name,
          email: bookingData.email,
          startTime: bookingData.startTime,
          endTime: bookingData.endTime,
          googleEventId: "",
          additionalInfo: bookingData.additionalInfo,
          meetLink
        },
      });
  
      return { success: true, booking, meetLink };
    } catch (error) {
      console.error("Error creating booking:", error);
      return { success: false, error: error.message };
    }
  }



//   export async function createBookingMeeting(bookingData: bookingType) {
//     try {
//       // Fetch the event and its creator
//       const event = await prisma.event.findUnique({
//         where: { id: bookingData.eventId },
//         include: { user: true },
//       });
  
//       if (!event) {
//         throw new Error("Event not found");
//       }
  
//       // Get the event creator's Google OAuth token from Clerk
//       const { data } = await clerkClient.users.getUserOauthAccessToken(
//         event.user.clerkUserId,
//         "oauth_google"
//       );
  
//       const token = data[0]?.token;
  
//       if (!token) {
//         throw new Error("Event creator has not connected Google Calendar");
//       }
  
//       // Set up Google OAuth client
//       const oauth2Client = new google.auth.OAuth2();
//       oauth2Client.setCredentials({ access_token: token });
  
//       const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  
//       // Create Google Meet link
//       const meetResponse = await calendar.events.insert({
//         calendarId: "primary",
//         conferenceDataVersion: 1,
//         requestBody: {
//           summary: `${bookingData.name} - ${event.title}`,
//           description: bookingData.additionalInfo,
//           start: { dateTime: bookingData.startTime },
//           end: { dateTime: bookingData.endTime },
//           attendees: [{ email: bookingData.email }, { email: event.user.email }],
//           conferenceData: {
//             createRequest: { requestId: `${event.id}-${Date.now()}` },
//           },
//         },
//       });
  
//       const meetLink = meetResponse.data.hangoutLink;
//       const googleEventId = meetResponse.data.id;
  
//       // Create booking in database
//       const booking = await prisma.booking.create({
//         data: {
//           eventId: event.id,
//           userId: event.userId,
//           name: bookingData.name,
//           email: bookingData.email,
//           startTime: bookingData.startTime,
//           endTime: bookingData.endTime,
//           additionalInfo: bookingData.additionalInfo,
//           meetLink,
//           googleEventId,
//         },
//       });
  
//       return { success: true, booking, meetLink };
//     } catch (error) {
//       console.error("Error creating booking:", error);
//       return { success: false, error: error.message };
//     }
//   }