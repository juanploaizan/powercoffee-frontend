import { NextResponse } from "next/server";
import api from "@/lib/axios-interceptor";

export async function GET(
  req: Request,
  { params }: { params: { coffeeShopId: string } }
) {
  try {
    const res = await api.get(
      `/api/coffee-shops/${params.coffeeShopId}/customers`
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("[CUSTOMERS_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { coffeeShopId: string } }
) {
  try {
    const body = await req.json();
    const res = await api.post(
      `/api/coffee-shops/${params.coffeeShopId}/customers`,
      body
    );
    return NextResponse.json(res.data);
  } catch (error: any) {
    //console.log("[CUSTOMERS_POST] ", error);
    const errorMessage = error?.response?.data?.message;
    return new NextResponse(errorMessage, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { coffeeShopId: string } }
) {
  try {
    const body = await req.json();
    const res = await api.delete(
      `/api/coffee-shops/${params.coffeeShopId}/customers`,
      { data: body }
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("[CUSTOMERS_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
