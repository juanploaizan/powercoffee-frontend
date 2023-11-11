import { NextResponse } from "next/server";
import api from "@/lib/axios-interceptor";

export async function GET(
  req: Request,
  { params }: { params: { coffeeShopId: string } }
) {
  try {
    const res = await api.get(
      `/api/coffee-shops/${params.coffeeShopId}/categories`
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("[CATEGORIES_GET] ", error);
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
      `/api/coffee-shops/${params.coffeeShopId}/categories`,
      body
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("[CATEGORIES_POST] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { coffeeShopId: string } }
) {
  try {
    const body = await req.json();

    const res = await api.delete(
      `/api/coffee-shops/${params.coffeeShopId}/categories`,
      { data: body }
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("[CATEGORIES_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
