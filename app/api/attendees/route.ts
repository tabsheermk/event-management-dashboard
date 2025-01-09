import { Attendee, attendees } from "@/lib/data";
import { NextResponse } from "next/server";

// GET - /api/attendees => Get all attendees across all events
export async function GET() {
    return NextResponse.json(attendees);
}


// POST - /api/attendees => Add a new attendee
export async function POST(request: Request) {
    const newAttendee : Attendee = await request.json();
    newAttendee.id = Date.now(); // random id for the attendee
    attendees.push(newAttendee);
    return NextResponse.json(newAttendee, {status: 201});
}