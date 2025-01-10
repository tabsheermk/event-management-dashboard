import { attendees  } from "@/lib/data";
import { NextResponse } from "next/server";


// DELETE /api/attendeees/[id] => Delete an attendee by Id
export async function DELETE(request: Request, context: {params: {id: string}}) {
    const id = parseInt(context.params.id);
    const attendeeIndex = attendees.findIndex((attendee) => attendee.id === id);
    if(attendeeIndex !== -1) {
        attendees.splice(attendeeIndex, 1);
        return NextResponse.json({message: "Attendee deleted successfullyy"});
    } else {
        return NextResponse.json({message: "Attendee Not Found"}, {status: 404});
    }
}