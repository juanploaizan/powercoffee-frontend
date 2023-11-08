import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Order } from "@/types/schemas";

interface OrderDetailsProps {
  order: Order;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p>Order details </p>
          <Badge className="mr-2">{order.orderStatus}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-semibold leading-none">
              Date:{" "}
              <span className="font-normal">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                }).format(new Date(order.date))}
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-semibold leading-none">
              Employee:{" "}
              <span className="font-normal">
                {order.employee.firstName + " " + order.employee.lastName} -{" "}
                {order.employee.dni}
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-semibold leading-none">
              Customer:{" "}
              <span className="font-normal">
                {order.customer.firstName + " " + order.customer.lastName} -{" "}
                {order.customer.dni}
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-semibold leading-none">
              Total products:{" "}
              <span className="font-normal">{order.orderDetails.length}</span>
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-center">
        <p className="text-base font-semibold leading-none">
          Total:{" "}
          <span className="font-normal">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 2,
            }).format(order.total)}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
