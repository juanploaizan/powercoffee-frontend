import { API_URL } from "@/app/config";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await axios.post(`${API_URL}/api/users/forgot-password`, body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    //console.log("[COFFEE-SHOPS_POST] ", error);
    return new NextResponse(JSON.stringify(error.response.data), {
      status: error.response.status,
    });
  }
}
