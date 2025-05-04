import { ITodo } from "@app/libs/types/todo.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestBody: ITodo = await request.json();

  if (!requestBody.task) {
    return new NextResponse(
      JSON.stringify({ message: "Please specify your task is" }),
      { status: 400 }
    );
  }

  if (requestBody.task) {
    return new NextResponse(
      JSON.stringify({
        message: "New Task has successfully added to your list",
        data: {
          ...requestBody,
          id: Math.random().toString(),
          isCompleted: false,
        },
      }),
      {
        status: 200,
      }
    );
  }

  return new NextResponse(JSON.stringify({ message: "An Error has occured" }), {
    status: 500,
  });
}
