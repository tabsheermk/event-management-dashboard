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
    <div>
      <ul>
        {attendees.map((attendee) => (
          <li key={attendee.id}>
            <input
              type="checkbox"
              checked={selectedAttendees.some((a) => a.id === attendee.id)}
              onChange={() => handleAttendeeSelect(attendee)}
            />
            {attendee.name}
            <button onClick={() => onDelete(attendee.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleUpdate}>Update Event Attendees</button>
    </div>
  );
}