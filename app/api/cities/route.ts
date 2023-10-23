import { NextResponse } from "next/server";
import api from "@/lib/axios-interceptor";

export async function GET(req: Request) {
  try {
    const res = await api.get("/api/cities");
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("[CITIES_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
