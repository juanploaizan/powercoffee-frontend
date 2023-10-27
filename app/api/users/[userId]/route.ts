import api from "@/lib/axios-interceptor";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();
    const res = await api.put(`/api/users/${params.userId}`, body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    //console.log("[USERS_PUT] ", error);
    return new NextResponse(JSON.stringify(error.response.data), {
      status: error.response.status,
    });
  }
}
