import { ITodo } from "@app/libs/types/todo.types";
import { today } from "@app/libs/utilities/helper/date.helper";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
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
