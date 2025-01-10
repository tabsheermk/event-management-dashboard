"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "../../../components/tasks/TaskList";
import TaskForm from "../../../components/tasks/TaskForm";
import { Task, Event, Attendee } from "../../../lib/data";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const fetchTasks = async (eventId: number) => {
    try {
      const response = await axios.get(`/api/tasks?eventId=${eventId}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchAttendees = async () => {
    try {
      const response = await axios.get("/api/attendees");
      setAttendees(response.data);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchAttendees();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      fetchTasks(selectedEventId);
    } else {
      setTasks([]);
    }
  }, [selectedEventId]);

  const handleAddTask = async (newTask: Task) => {
    try {
      const response = await axios.post("/api/tasks", newTask);
      setTasks([...tasks, response.data]);
      setShowForm(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  const handleUpdateTask = async (
    taskId: number,
    updatedTask: Partial<Task>
  ) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}`, updatedTask);
      setTasks(
        tasks.map((task) => (task.id === taskId ? response.data : task))
      );
      setShowForm(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Tracker</h1>

      <div className="mb-4">
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={selectedEventId || ""}
          onChange={(e) => setSelectedEventId(Number(e.target.value))}
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
        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowForm(true)}
          >
            Add Task
          </button>
        </div>
      )}

      {showForm && (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <TaskForm
            onSubmit={
              selectedTask
                ? (updatedTask) => handleUpdateTask(selectedTask.id, updatedTask)
                : handleAddTask
            }
            onCancel={() => {
              setShowForm(false);
              setSelectedTask(null);
            }}
            attendees={attendees}
            initialTask={selectedTask}
            selectedEventId={selectedEventId}
          />
        </div>
      )}

      {selectedEventId && (
        <TaskList
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          attendees={attendees}
        />
      )}
    </div>
  );
}