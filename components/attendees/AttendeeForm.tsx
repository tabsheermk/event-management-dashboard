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
      <button type="submit">Add Attendee</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}