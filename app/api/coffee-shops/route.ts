import { NextResponse } from "next/server";
import { useSession } from "@/lib/user-session";
import api from "@/lib/axios-interceptor";

export async function POST(req: Request) {
  try {
    const user = await useSession();

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
