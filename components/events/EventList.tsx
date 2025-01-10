import { Event } from "@/lib/data";

interface EventListProps {
    events: Event[];
    onEdit: (event: Event) => void;
    onDelete: (eventId: number) => void;
}

export default function EventList({events, onEdit, onDelete} : EventListProps){
    return (
        <ul className="space-y-4">
      {events.map((event) => (
        <li
          key={event.id}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-800">{event.name}</h2>
          <p className="text-gray-600">{event.description}</p>
          <p className="text-gray-600">
            {event.location} - {event.date}
          </p>
          <div className="mt-2 space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              onClick={() => onEdit(event)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              onClick={() => onDelete(event.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
    );
}