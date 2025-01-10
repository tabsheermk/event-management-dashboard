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
    <ul className="space-y-4">
    {localTasks.map((task) => (
      <li
        key={task.id}
        className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-800 font-bold">{task.name}</span>
          <div className="flex items-center space-x-2">
            {/* Status Dropdown */}
            <select
              value={task.status}
              onChange={(e) =>
                handleStatusChange(
                  task.id,
                  e.target.value as "Pending" | "Completed"
                )
              }
              className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Unassigned</option>
              {attendees.map((attendee) => (
                <option key={attendee.id} value={attendee.id}>
                  {attendee.name}
                </option>
              ))}
            </select>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              onClick={() => onEditTask(task)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    ))}
  </ul>
  );
}