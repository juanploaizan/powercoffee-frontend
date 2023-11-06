import api from "@/lib/axios-interceptor";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { coffeeShopId: string; orderId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const res = await api.patch(
      `/api/coffee-shops/${params.coffeeShopId}/orders/${params.orderId}?status=${status}`
    );
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.log("[PRODUCTS_PUT] ", error);
    const errorMessage = error?.response?.data?.message;
    return new NextResponse(errorMessage, { status: 500 });
  }
}
