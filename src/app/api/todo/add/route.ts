import { ITodo } from "@app/libs/types/todo.types";
import { today } from "@app/libs/utilities/helper/date.helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestBody: ITodo = await request.json();

  if (!requestBody.task) {
    return new NextResponse(
      JSON.stringify({ message: "Sorry we can't update your task" }),
      { status: 400 }
    );
  }

  if (requestBody.task) {
    return new NextResponse(
      JSON.stringify({
        message: "Task has successfully Updated",
        data: {
          ...requestBody,
          id: Math.random().toString(),
          isCompleted: false,
          updatedAt: today,
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
