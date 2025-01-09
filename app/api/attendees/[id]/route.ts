import { attendees  } from "@/lib/data";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
    const id = parseInt(params.id);
    const attendeeIndex = attendees.findIndex((attendee) => attendee.id === id);
    if(attendeeIndex !== -1) {
        attendees.splice(attendeeIndex, 1);
        return NextResponse.json({message: "Attendee deleted successfullyy"});
    } else {
        return NextResponse.json({message: "Attendee Not Found"}, {status: 404});
    }
}