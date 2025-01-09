import { NextResponse } from "next/server";
import { tasks } from "@/lib/data";

// PUT /api/tasks/[id] => Update a task's status
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const { status } = await request.json(); // Only allow updating status

  if (status !== "Pending" && status !== "Completed") {
    return NextResponse.json({ error: "Invalid status value" },{ status: 400 });
  }

  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = status;
    return NextResponse.json(tasks[taskIndex]);
  } else {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
}