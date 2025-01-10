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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Attendee Management
      </h1>

      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowForm(true)}
        >
          Add Attendee
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <AttendeeForm
            onSubmit={handleAddAttendee}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="mb-6">
        <label
          htmlFor="eventSelect"
          className="block text-gray-700 font-bold mb-2"
        >
          Select Event:
        </label>
        <select
          id="eventSelect"
          value={selectedEventId || ""}
          onChange={(e) => handleEventSelect(Number(e.target.value) || null)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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