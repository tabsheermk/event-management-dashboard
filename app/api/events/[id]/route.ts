import { Event, events } from "@/lib/data";
import { NextResponse } from "next/server";

// GET /api/events/[id] => Get details for a specific event
export async function GET(
  request: Request,
  {params}: {params: Promise<{id: string}>}
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const idString = resolvedParams.id;

    // Validate ID
    if (!idString || isNaN(parseInt(idString))) {
      return NextResponse.json({ message: "Invalid Event ID" }, { status: 400 });
    }

    const id = parseInt(idString);
    const event = events.find((event) => event.id === id);

    if (event) {
      return NextResponse.json(event);
    } else {
      return NextResponse.json({ message: "Event Not Found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in GET /api/events/[id] route:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT /api/events/[id] => Update the details of a specific event
export async function PUT(
  request: Request,
  {params}: {params: Promise<{id: string}>}
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const idString = resolvedParams.id;

    // Validate ID
    if (!idString || isNaN(parseInt(idString))) {
      return NextResponse.json({ message: "Invalid Event ID" }, { status: 400 });
    }

    const id = parseInt(idString);
    const updatedEvent: Event = await request.json();
    const eventIndex = events.findIndex((event) => event.id === id);

    if (eventIndex !== -1) {
      events[eventIndex] = { ...events[eventIndex], ...updatedEvent };
      return NextResponse.json(events[eventIndex]);
    } else {
      return NextResponse.json({ message: "Event Not Found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in PUT /api/events/[id] route:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id] => Delete an event
export async function DELETE(
  request: Request,
 {params}: {params: Promise<{id: string}>}
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const idString = resolvedParams.id;

    // Validate ID
    if (!idString || isNaN(parseInt(idString))) {
      return NextResponse.json({ message: "Invalid Event ID" }, { status: 400 });
    }

    const id = parseInt(idString);
    const eventIndex = events.findIndex((event) => event.id === id);

    if (eventIndex !== -1) {
      events.splice(eventIndex, 1);
      return NextResponse.json({ message: "Event deleted successfully" });
    } else {
      return NextResponse.json({ message: "Event Not Found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in DELETE /api/events/[id] route:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}