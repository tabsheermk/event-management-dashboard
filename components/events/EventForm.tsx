import { useState, FormEvent } from "react";
import { Event } from "@/lib/data";

interface EventFormProps {
  onSubmit: (event: Event) => void;
  onCancel: () => void;
  initialEvent?: Event | null; // to prevent undefined error
}

export default function EventForm({onSubmit, onCancel,initialEvent = null }: EventFormProps) {
  const [name, setName] = useState(initialEvent?.name || "");
  const [description, setDescription] = useState(
    initialEvent?.description || ""
  );

  const [location, setLocation] = useState(initialEvent?.location || "");
  const [date, setDate] = useState(initialEvent?.date || "");

  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newEvent: Event = {
      id: initialEvent ? initialEvent.id : Date.now(), // Keep existing ID if updating the event
      name,
      description,
      location,
      date,
      attendees: initialEvent ? initialEvent.attendees : [], // Keep existing attendees if updating the event
    };
    onSubmit(newEvent);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit">
        {initialEvent ? "Update" : "Create"} Event
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}