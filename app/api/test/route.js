import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    keyPrefix: process.env.GEMINI_API_KEY?.slice(0, 10),
  });
}