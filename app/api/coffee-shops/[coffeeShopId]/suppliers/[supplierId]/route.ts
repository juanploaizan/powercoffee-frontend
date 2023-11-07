import { NextResponse } from "next/server";
import { useSession } from "@/lib/user-session";
import api from "@/lib/axios-interceptor";

export async function PUT(
  req: Request,
  { params }: { params: { coffeeShopId: string; supplierId: string } }
) {
  try {
    const user = await useSession();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    console.log("params", params);
    const res = await api.put(
      `/api/coffee-shops/${params.coffeeShopId}/suppliers/${params.supplierId}`,
      body
    );
    return NextResponse.json(res.data);
  } catch (error: any) {
    //console.log("[SUPPLIERS_PUT] ", error);
    const errorMessage = error?.response?.data?.message;
    return new NextResponse(errorMessage, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { coffeeShopId: string; supplierId: string } }
) {
  try {
    const user = await useSession();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const res = await api.delete(
      `/api/coffee-shops/${params.coffeeShopId}/suppliers/${params.supplierId}`
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("[SUPPLIERS_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}