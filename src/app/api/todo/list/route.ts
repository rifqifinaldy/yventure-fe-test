import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("datas");
  const datas = raw ? JSON.parse(raw) : [];

  return new NextResponse(
    JSON.stringify({
      message: "Success",
      data: datas,
    }),
    {
      status: 200,
    }
  );
}
