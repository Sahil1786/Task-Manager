import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// In-memory storage for tasks
// In a real app, you would use a database like MongoDB
const tasks = [
  { id: "1", text: "Learn React", completed: false },
  { id: "2", text: "Build a task app", completed: false },
  { id: "3", text: "Deploy to Vercel", completed: false },
]

export async function GET() {
  return NextResponse.json(tasks)
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.text) {
    return NextResponse.json({ error: "Task text is required" }, { status: 400 })
  }

  const newTask = {
    id: uuidv4(),
    text: body.text,
    completed: false,
  }

  tasks.push(newTask)
  return NextResponse.json(newTask, { status: 201 })
}

