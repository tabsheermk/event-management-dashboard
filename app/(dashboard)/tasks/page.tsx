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
    <div>
      <h1>Task Tracker</h1>

      <select
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

      {selectedEventId && (
        <button onClick={() => setShowForm(true)}>Add Task</button>
      )}

      {showForm && (
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