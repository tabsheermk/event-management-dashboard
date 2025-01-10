"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import EventList from "@/components/events/EventList";
import EventForm from "@/components/events/EventForm";
import { Event } from "@/lib/data";

export default function EventsPage() {

  const [events, setEvents] = useState<Event[]>([]);
  
  const [showForm, setShowForm] = useState(false);
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // to fetch every time page reloads
  useEffect(() => {
    fetchEvents();
  }, []);

  // function to add a new event to the list
  const handleAddEvent = async (newEvent: Event) => {
    try {
      const response = await axios.post("/api/events", newEvent);
      setEvents([...events, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // function to populate the form to edit an existingg event
  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowForm(true);
  };

  // functoin to updatep the existing event
  const handleUpdateEvent = async (updatedEvent: Event) => {
    try {
      const response = await axios.put(
        `/api/events/${updatedEvent.id}`,
        updatedEvent
      );
      setEvents(
        events.map((event) =>
          event.id === updatedEvent.id ? response.data : event
        )
      );
      setShowForm(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // function to deletee an exvent
  const handleDeleteEvent = async (eventId: number) => {
    try {
      await axios.delete(`/api/events/${eventId}`);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Event Dashboard</h1>

      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowForm(true)}
        >
          Add Event
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <EventForm
            onSubmit={selectedEvent ? handleUpdateEvent : handleAddEvent}
            onCancel={() => {
              setShowForm(false);
              setSelectedEvent(null);
            }}
            initialEvent={selectedEvent}
          />
        </div>
      )}

      <EventList  
        events={events}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
}