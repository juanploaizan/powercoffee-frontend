import api from "@/lib/axios-interceptor";
import { Metadata } from "next";
import OrdersClientPage from "./client";

export const metadata: Metadata = {
  title: "Order Page - Powercoffee",
  description: "Order Page",
};

const getOrders = async (
  coffeeShopId: string,
  startDate: string,
  endDate: string,
  status: string
) => {
  const response = await api
    .get(
      `/api/coffee-shops/${coffeeShopId}/orders?${startDate}&${endDate}&${status}`
    )
    .then((res) => res.data)
    .catch((err) => []);
  return response;
};

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: { coffeeShopId: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  // search params: startDate, endDate, status
  const startDate = searchParams?.startDate
    ? `startDate=${searchParams.startDate}`
    : "";
  const endDate = searchParams?.endDate
    ? `endDate=${searchParams.endDate}`
    : "";
  const status = searchParams?.status ? `status=${searchParams.status}` : "";

  const orders = await getOrders(
    params.coffeeShopId,
    startDate,
    endDate,
    status
  );

  return (
    <div className="flex-col">
      <OrdersClientPage orders={orders} />
    </div>
  );
}
