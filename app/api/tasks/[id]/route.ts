import { NextResponse } from "next/server"

// Reference to the in-memory tasks array
// In a real app, you would use a database like MongoDB
let tasks = [
  { id: "1", text: "Learn React", completed: false },
  { id: "2", text: "Build a task app", completed: false },
  { id: "3", text: "Deploy to Vercel", completed: false },
]

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const taskIndex = tasks.findIndex((task) => task.id === id)

  if (taskIndex === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  tasks = tasks.filter((task) => task.id !== id)
  return NextResponse.json({ success: true })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await request.json()
  const taskIndex = tasks.findIndex((task) => task.id === id)

  if (taskIndex === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...body,
  }

  return NextResponse.json(tasks[taskIndex])
}

