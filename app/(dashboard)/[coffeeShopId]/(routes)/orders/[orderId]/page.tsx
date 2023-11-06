import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import api from "@/lib/axios-interceptor";
import { Order } from "@/types/schemas";
import { Metadata } from "next";
import { ProductDetail } from "./components/product-detail";
import { OrderDetails } from "./components/order-details";

export const metadata: Metadata = {
  title: "Order details - Powercoffee",
  description: "Order Page",
};

const getOrdersById = async (coffeeShopId: string, orderId: string) => {
  const response = await api
    .get(`/api/coffee-shops/${coffeeShopId}/orders/${orderId}`)
    .then((res) => res.data)
    .catch((err) => null);
  return response;
};

export default async function OrdersPage({
  params,
}: {
  params: { coffeeShopId: string; orderId: string };
}) {
  const order: Order = await getOrdersById(params.coffeeShopId, params.orderId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Order #${params.orderId}`}
            description="These are the details of the order."
          />
        </div>
        <Separator />
        <div className="container mx-auto py-10">
          <OrderDetails order={order} />

          <div className="grid grid-cols-3 gap-2 col-auto mt-4">
            {order.orderDetails.map((orderDetail) => (
              <ProductDetail
                key={orderDetail.product.id}
                product={orderDetail.product}
                productPrice={orderDetail.productPrice}
                quantity={orderDetail.quantity}
                subtotal={orderDetail.subtotal}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
