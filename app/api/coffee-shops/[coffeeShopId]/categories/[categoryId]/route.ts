import { NextResponse } from "next/server";
import { useSession } from "@/lib/user-session";
import api from "@/lib/axios-interceptor";

export async function PUT(
  req: Request,
  { params }: { params: { coffeeShopId: string; categoryId: string } }
) {
  try {
    const user = await useSession();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    console.log("body", body);

    console.log("params", params);
    const res = await api.put(
      `/api/coffee-shops/${params.coffeeShopId}/categories/${params.categoryId}`,
      body
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("[CATEGORIES_PUT] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { coffeeShopId: string; categoryId: string } }
) {
  try {
    const user = await useSession();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const res = await api.delete(
      `/api/coffee-shops/${params.coffeeShopId}/categories/${params.categoryId}`
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("[CATEGORIES_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
