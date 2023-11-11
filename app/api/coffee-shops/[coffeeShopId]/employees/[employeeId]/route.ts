import { NextResponse } from "next/server";
import api from "@/lib/axios-interceptor";

export async function PUT(
  req: Request,
  { params }: { params: { coffeeShopId: string; employeeId: string } }
) {
  try {
    const body = await req.json();
    const res = await api.put(
      `/api/coffee-shops/${params.coffeeShopId}/employees/${params.employeeId}`,
      body
    );
    return NextResponse.json(res.data);
  } catch (error: any) {
    //console.log("[EMPLOYEES_PUT] ", error);
    const errorMessage = error?.response?.data?.message;
    return new NextResponse(errorMessage, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { coffeeShopId: string; employeeId: string } }
) {
  try {
    const res = await api.delete(
      `/api/coffee-shops/${params.coffeeShopId}/employees/${params.employeeId}`
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("[EMPLOYEES_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
