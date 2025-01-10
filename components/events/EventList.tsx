import { Event } from "@/lib/data";

interface EventListProps {
    events: Event[];
    onEdit: (event: Event) => void;
    onDelete: (eventId: number) => void;
}

export default function EventList({events, onEdit, onDelete} : EventListProps){
    return (
        <ul>
            {events.map((event) => (
                <li key={event.id}>
                    <h2>{event.name}</h2>
                    <p>{event.description}</p>
                    <p>{event.location} - {event.date}</p>
                    <button onClick={() => onEdit(event)}>Edit</button>
                    <button onClick={() => onDelete(event.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}