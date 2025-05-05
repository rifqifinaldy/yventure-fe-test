import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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
