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
    date: string;
    attendees: Attendee[]; 
}

// Initializing with some sample data (for testing)
export const events: Event[] = [
    {
      id: 1,
      name: "Sample Event 1",
      description: "This is a sample event.",
      location: "Virtual",
      date: "2024-01-15",
      attendees: [],
    },
  ];
  
  export const attendees: Attendee[] = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];
  
  export const tasks: Task[] = [
    {
      id: 1,
      eventId: 1,
      name: "Prepare presentation slides",
      deadline: "2024-01-12",
      status: "Pending",
      attendeeId: 1,
    },
  ];