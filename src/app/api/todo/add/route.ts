import { ITodo } from "@app/libs/types/todo.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestBody: ITodo = await request.json();

  if (!requestBody.task) {
    return new NextResponse(
      JSON.stringify({ name: "Please specify your task is" }),
      { status: 400 }
    );
  }

  console.log("REQUEST", requestBody.task);

  return new NextResponse(
    JSON.stringify({
      message: "New Task has successfully added to your list",
      data: requestBody,
    }),
    {
      status: 200,
    }
  );
}
