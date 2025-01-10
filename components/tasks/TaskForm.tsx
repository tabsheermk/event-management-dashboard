import { useState, FormEvent } from "react";
import { Task, Attendee } from "../../lib/data";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onCancel: () => void;
  attendees: Attendee[];
  initialTask?: Task | null;
  selectedEventId: number | null;
}

export default function TaskForm({
  onSubmit,
  onCancel,
  attendees,
  initialTask = null,
  selectedEventId,
}: TaskFormProps) {
  const [name, setName] = useState(initialTask?.name || "");
  const [deadline, setDeadline] = useState(initialTask?.deadline || "");
  const [attendeeId, setAttendeeId] = useState<number | null>(
    initialTask?.attendeeId || null
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name || !deadline) {
      alert("Please fill in the task name and deadline.");
      return;
    }

    const newTask: Task = {
      id: initialTask ? initialTask.id : Date.now(),
      eventId: selectedEventId!,
      name,
      deadline,
      attendeeId,
      status: initialTask ? initialTask.status : "Pending",
    };

    onSubmit(newTask);
  };

  return (
<form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Task Name:
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
          htmlFor="deadline"
          className="block text-gray-700 font-bold mb-2"
        >
          Deadline:
        </label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="attendee" className="block text-gray-700 font-bold mb-2">
          Assigned Attendee:
        </label>
        <select
          id="attendee"
          value={attendeeId || ""}
          onChange={(e) => setAttendeeId(Number(e.target.value) || null)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Unassigned</option>
          {attendees.map((attendee) => (
            <option key={attendee.id} value={attendee.id}>
              {attendee.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {initialTask ? "Update" : "Create"} Task
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