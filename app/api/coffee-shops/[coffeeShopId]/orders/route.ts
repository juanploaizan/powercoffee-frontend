import api from "@/lib/axios-interceptor";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { coffeeShopId: string } }
) {
  try {
    const body = await req.json();

    const res = await api.post(
      `/api/coffee-shops/${params.coffeeShopId}/orders`,
      body
    );
    return NextResponse.json(res.data);
  } catch (error: any) {
    //console.log("[ORDERS_POST] ", error);
    const errorMessage = error?.response?.data?.message;
    return new NextResponse(errorMessage, { status: 500 });
  }
}
