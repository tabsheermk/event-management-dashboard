import { Task, tasks, events } from "@/lib/data";
import { NextResponse } from "next/server";

// GET - /api/tasks?eventId=[eventId] => Get all tasks associated with an event
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const eventId = parseInt(searchParams.get('eventId') || "-1");

    if(eventId === -1) {
        return NextResponse.json({error: "Event ID missing"}, {status: 400});
    }

    // Checking if the event associatd exists
    const eventExists = events.some((event) => event.id === eventId);
    if(!eventExists) {
        return NextResponse.json({error: "Event Not FOund"}, {status: 404});
    }

    const eventTasks: Task[] = tasks.filter((task) => task.eventId === eventId);
    return NextResponse.json(eventTasks);
}

// POST - /api/tasks => Create a task associated with an event
export async function  POST(request: Request) {
    const newTask: Task = await request.json();

    // Checking if the event associatd exists
    const eventExists = events.some((event) => event.id === newTask.eventId);
    if(!eventExists) {
        return NextResponse.json({error: "Event Not FOund"}, {status: 404});
    }

    newTask.id = Date.now(); // Randomly generatedd id bsed on date
    newTask.status = "Pending"; // initially assigning pending status
    tasks.push(newTask);
    return NextResponse.json(newTask, {status: 201});
}