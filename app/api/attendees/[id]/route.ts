import { attendees  } from "@/lib/data";
import { NextResponse } from "next/server";


// DELETE /api/attendeees/[id] => Delete an attendee by Id
export async function DELETE(request: Request, {params}: {params: Promise<{id: string}>}) {
    try {
        const resolvedParams = await Promise.resolve(params);
        const idString = resolvedParams.id;
    
        // Validate that the ID is a string and can be parsed to a number
        if (!idString || isNaN(parseInt(idString))) {
          return NextResponse.json(
            { message: "Invalid Attendee ID" },
            { status: 400 }
          );
        }
    
        const id = parseInt(idString);
    
        const attendeeIndex = attendees.findIndex((attendee) => attendee.id === id);
    
        if (attendeeIndex !== -1) {
          attendees.splice(attendeeIndex, 1);
          return NextResponse.json({ message: "Attendee deleted successfully" });
        } else {
          return NextResponse.json(
            { message: "Attendee Not Found" },
            { status: 404 }
          );
        }
      } catch (error) {
        console.error("Error in DELETE route:", error);
        return NextResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
    }

}