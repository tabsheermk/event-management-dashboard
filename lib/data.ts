// For dev purposes let's store the data in arrays for now

// Defining interfaces for Attendee, Event and Task

export interface Attendee {
    id: number;
    name: string;
}

export interface Task {
    id: number;
    eventId: number;
    name: string;
    deadline: string; // deadline can be a date
    status: "Pending" | "Completed";
    attendeeId: number | null; 
} 

export interface Event {
    id: number;
    name: string;
    description: string;
    location: string;
    attendees: Attendee[]; 
}

export let events:Event[];
export let attendees: Attendee[];
export let tasks: Task[];