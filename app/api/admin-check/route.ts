import { NextResponse } from "next/server";

const ADMIN_KEY = process.env.ADMIN_KEY;

export async function GET(req: Request) {
  const key = req.headers.get("x-admin-key");
  if (key === ADMIN_KEY) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
