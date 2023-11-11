import { authConfig } from "@/lib/auth";
import api from "@/lib/axios-interceptor";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { coffeeShopId: string } }
) {
  try {
    const session = await getServerSession(authConfig);
    const user = session?.user;

    if (!user) {
      return NextResponse.redirect("api/auth/signin");
    }

    const body = await req.json();

    if (!params.coffeeShopId) {
      return new NextResponse("Missing coffeeShopId", { status: 400 });
    }

    const res = await api.put(`/api/coffee-shops/${params.coffeeShopId}`, {
      ...body,
      adminId: user.id,
    });

    const coffeeShop = res.data;

    return NextResponse.json(coffeeShop);
  } catch (error) {
    console.log("[COFFEE-SHOP_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { coffeeShopId: string } }
) {
  try {
    if (!params.coffeeShopId) {
      return new NextResponse("Missing coffeeShopId", { status: 400 });
    }

    const res = await api.delete(`/api/coffee-shops/${params.coffeeShopId}`);

    const coffeeShop = res.data;

    return NextResponse.json(coffeeShop);
  } catch (error) {
    console.log("[COFFEE-SHOP_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
