import { useState, useEffect } from "react";
import { Attendee, Event } from "../../lib/data";

interface AttendeeListProps {
  attendees: Attendee[];
  onDelete: (attendeeId: number) => void;
  selectedEventId: number | null;
  onUpdateEventAttendees: (eventId: number, attendee: Attendee[]) => void;
  events: Event[];
}

export default function AttendeeList({
  attendees,
  onDelete,
  selectedEventId,
  onUpdateEventAttendees,
  events,
}: AttendeeListProps) {
  const [selectedAttendees, setSelectedAttendees] = useState<Attendee[]>([]);

  // Find the selected event
  const selectedEvent = events.find((event) => event.id === selectedEventId);

  useEffect(() => {
    // Update selectedAttendees whenever the selected event changes
    if (selectedEvent) {
      setSelectedAttendees(selectedEvent.attendees);
    }
  }, [selectedEvent, attendees]);

  const handleAttendeeSelect = (attendee: Attendee) => {
    setSelectedAttendees((prevAttendees) => {
      const attendeeExists = prevAttendees.some((a) => a.id === attendee.id);
      if (attendeeExists) {
        return prevAttendees.filter((a) => a.id !== attendee.id);
      } else {
        return [...prevAttendees, attendee];
      }
    });
  };

  const handleUpdate = () => {
    if (selectedEventId) {
      onUpdateEventAttendees(selectedEventId, selectedAttendees);
    }
  };

  return (
    <div className="mt-6">
    <ul className="space-y-4">
      {attendees.map((attendee) => (
        <li
          key={attendee.id}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedAttendees.some((a) => a.id === attendee.id)}
              onChange={() => handleAttendeeSelect(attendee)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-800">{attendee.name}</span>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
            onClick={() => onDelete(attendee.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
    <button
      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleUpdate}
    >
      Update Event Attendees
    </button>
  </div>
  );
}