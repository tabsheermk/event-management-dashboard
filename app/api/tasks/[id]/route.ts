import { NextResponse } from "next/server";
import { tasks } from "@/lib/data";

// PUT /api/tasks/[id] => Update a task's status
export async function PUT(request: Request, {params}: { params: Promise<{ id: string }> }) {
  
  try{
    
    const resolvedParams = await Promise.resolve(params);
    const idString = resolvedParams.id;
    
    // Validate that the ID is a string and can be parsed to a number
    if (!idString || isNaN(parseInt(idString))) {
      return NextResponse.json(
        { message: "Invalid Task ID" },
        { status: 400 }
        );
    }

    const id = parseInt(idString);

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

  } catch (error) {
    console.error("Error in PUT route:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
}
}