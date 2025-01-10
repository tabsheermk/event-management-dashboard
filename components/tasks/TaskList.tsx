import { useState, useEffect } from "react";
import { Task, Attendee } from "../../lib/data";

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
  attendees: Attendee[];
}

export default function TaskList({
  tasks,
  onUpdateTask,
  onEditTask,
  onDeleteTask,
  attendees,
}: TaskListProps) {
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  // Update localTasks when the tasks prop changes
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const handleAttendeeChange = (taskId: number, attendeeId: number | null) => {
    setLocalTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, attendeeId } : task
      )
    );
    onUpdateTask(taskId, { attendeeId });
  };

  const handleStatusChange = (taskId: number, newStatus: "Pending" | "Completed") => {
    setLocalTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    onUpdateTask(taskId, { status: newStatus });
  };

  return (
    <ul>
      {localTasks.map((task) => (
        <li key={task.id}>
          <span>{task.name}</span>
          <div>
            {/* Status Dropdown */}
            <select
              value={task.status}
              onChange={(e) =>
                handleStatusChange(
                  task.id,
                  e.target.value as "Pending" | "Completed"
                )
              }
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Assignee Dropdown */}
            <select
              value={task.attendeeId || ""}
              onChange={(e) =>
                handleAttendeeChange(task.id, Number(e.target.value) || null)
              }
            >
              <option value="">Unassigned</option>
              {attendees.map((attendee) => (
                <option key={attendee.id} value={attendee.id}>
                  {attendee.name}
                </option>
              ))}
            </select>

            <button onClick={() => onEditTask(task)}>Edit</button>
            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}