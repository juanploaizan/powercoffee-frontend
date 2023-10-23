import { NextResponse } from "next/server";
import { useSession } from "@/lib/user-session";
import api from "@/lib/axios-interceptor";

export async function GET(
  req: Request,
  { params }: { params: { coffeeShopId: string } }
) {
  try {
    const user = await useSession();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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
    const user = await useSession();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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
