import { NextResponse } from "next/server";
import api from "@/lib/axios-interceptor";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authConfig);
    const user = session?.user;
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const res = await api.post("/api/coffee-shops", {
      ...body,
      adminId: user.id,
    });
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("[COFFEE-SHOPS_POST] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
