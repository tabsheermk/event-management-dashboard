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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Task Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="attendee">Assigned Attendee:</label>
        <select
          id="attendee"
          value={attendeeId || ""}
          onChange={(e) => setAttendeeId(Number(e.target.value) || null)}
        >
          <option value="">Unassigned</option>
          {attendees.map((attendee) => (
            <option key={attendee.id} value={attendee.id}>
              {attendee.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">{initialTask ? "Update" : "Create"} Task</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}