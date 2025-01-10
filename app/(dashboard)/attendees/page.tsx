"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AttendeeList from "../../../components/attendees/AttendeeList";
import AttendeeForm from "../../../components/attendees/AttendeeForm";
import { Attendee, Event } from "../../../lib/data";

export default function AttendeesPage() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  // fetch all attendees
  const fetchAttendees = async () => {
    try {
      const response = await axios.get("/api/attendees");
      setAttendees(response.data);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  // handler to add new attendee to the attendess list
  const handleAddAttendee = async (newAttendee: Attendee) => {
    try {
      const response = await axios.post("/api/attendees", newAttendee);
      setAttendees([...attendees, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding attendee:", error);
    }
  };

  // handdler to delete an attendee based on Id
  const handleDeleteAttendee = async (attendeeId: number) => {
    try {
      await axios.delete(`/api/attendees/${attendeeId}`);
      setAttendees(attendees.filter((attendee) => attendee.id !== attendeeId));
    } catch (error) {
      console.error("Error deleting attendee:", error);
    }
  };

  // function to fetch all events
  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // refetchign data when page relodads
  useEffect(() => {
    fetchAttendees();
    fetchEvents();
  }, []);

  const handleEventSelect = (eventId: number | null) => {
    setSelectedEventId(eventId);
  };

  const handleUpdateEventAttendees = async (
    eventId: number,
    updatedAttendees: Attendee[]
  ) => {
    try {
      const eventResponse = await axios.get(`/api/events/${eventId}`);
      const updatedEvent: Event = {
        ...eventResponse.data,
        attendees: updatedAttendees,
      };

      await axios.put(`/api/events/${eventId}`, updatedEvent);
      fetchEvents(); // Refresh events to reflect changes
    } catch (error) {
      console.error("Error updating event attendees:", error);
    }
  };

  return (
    <div>
      <h1>Attendee Management</h1>

      <button onClick={() => setShowForm(true)}>Add Attendee</button>

      {showForm && (
        <AttendeeForm
          onSubmit={handleAddAttendee}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div>
        <label htmlFor="eventSelect">Select Event:</label>
        <select
          id="eventSelect"
          value={selectedEventId || ""}
          onChange={(e) => handleEventSelect(Number(e.target.value) || null)}
        >
          <option value="">Select an Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {selectedEventId && (
        <AttendeeList
          attendees={attendees}
          onDelete={handleDeleteAttendee}
          selectedEventId={selectedEventId}
          onUpdateEventAttendees={handleUpdateEventAttendees}
          events={events}
        />
      )}
    </div>
  );
}