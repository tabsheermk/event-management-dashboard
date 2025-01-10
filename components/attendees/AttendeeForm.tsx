import { useState, FormEvent } from "react";
import { Attendee } from "../../lib/data";

interface AttendeeFormProps {
  onSubmit: (attendee: Attendee) => void;
  onCancel: () => void;
}

export default function AttendeeForm({onSubmit, onCancel }: AttendeeFormProps) {
  const [name, setName] = useState("");

  // handler to handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newAttendee: Attendee = {
      id: Date.now(),
      name,
    };
    onSubmit(newAttendee);
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
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Attendee
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