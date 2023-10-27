import { API_URL } from "@/app/config";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { resetToken: string } }
) {
  try {
    const body = await req.json();
    if (!params.resetToken) {
      return new NextResponse("Missing reset token", { status: 400 });
    }
    const res = await axios.patch(
      `${API_URL}/api/users/reset-password/${params.resetToken}`,
      {
        ...body,
      }
    );
    return new NextResponse(res.data, { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify(error.response.data), {
      status: error.response.status,
    });
  }
}
