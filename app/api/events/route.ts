import { Event, events } from "@/lib/data";
import { NextResponse } from "next/server";

// GET /api/events => Get all the Events
export async function GET() {
   return NextResponse.json(events);
}

// POST /api/events => Creating / Adding an event
export async function POST(request: Request) {
    const newEvent: Event = await request.json();
    newEvent.id = Date.now(); // generating random Id 
    newEvent.attendees = []; // keeping empty 
    events?.push(newEvent);
    return NextResponse.json(newEvent, { status: 201})
}
