import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  if (!id) {
    return new NextResponse(
      JSON.stringify({ message: "Invalid id identifier" }),
      { status: 400 }
    );
  }

  return new NextResponse(
    JSON.stringify({
      message: "Task has successfully been removed from your list",
      data: { id: id },
    }),
    {
      status: 200,
    }
  );
}
