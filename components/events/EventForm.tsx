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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
          Location:
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
          Date:
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {initialEvent ? "Update" : "Create"} Event
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}