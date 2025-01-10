import { Event, events } from "@/lib/data";
import { NextResponse } from "next/server";

// GET /api/events/[id] => Get details for a specific event
export async function GET(request: Request, context: {params: {id: string}}) {
    const id = parseInt(context.params.id);
    const event = events.find((event) => event.id === id);
    if (event) {
        return NextResponse.json(event);
    } else {
        return NextResponse.json({message: "Event Not Found"},{status: 404});
    }
}

// PUT /api/events/[id] => Update the details of a specific event
export async function PUT(request: Request, context: {params: {id: string}}) {
    const id = parseInt(context.params.id);
    const updatedEvent: Event = await request.json();
    const eventIndex = events.findIndex((event) => event.id === id)

    if(eventIndex !== -1) {
        events[eventIndex] = {...events[eventIndex], ...updatedEvent};
        return NextResponse.json(events[eventIndex]);
    } else {
        return NextResponse.json({message: "Event Not Found"}, {status: 404});
    }
}

// DELETE /api/events/[id] => Delete an event
export async function DELETE(request: Request, context: {params: {id: string}}) {
    const id = parseInt(context.params.id);
    const eventIndex = events.findIndex((event) => event.id === id);
    if (eventIndex !== -1) {
        events.splice(eventIndex, 1);
        return NextResponse.json({message: "Event deleted successffuly"});
    } else {
        return NextResponse.json({message: "Event Not Found"}, {status: 404});
    }
}