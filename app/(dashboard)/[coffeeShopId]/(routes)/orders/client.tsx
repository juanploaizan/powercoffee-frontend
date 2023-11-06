"use client";

import { OrderModal } from "@/components/modals/order-modal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { orderStatus } from "@/lib/combo-boxes";
import { Order } from "@/types/schemas";
import axios from "axios";
import { AlertCircle, Edit, Filter, Plus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface OrderPageProps {
  orders: Order[];
}

export default function OrdersClientPage({ orders }: OrderPageProps) {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedStatus, setSelectedStatus] = useState(
    (searchParams as URLSearchParams).get("status")?.toUpperCase() || ""
  );

  const handleStatusChange = (statusValue: string) => {
    setSelectedStatus(statusValue);
    router.push("?status=" + statusValue.toLowerCase());
  };

  const handleStatusEditChange = async (
    orderId: string,
    statusValue: string
  ) => {
    console.log("statusValue ", statusValue, "orderId ", orderId);

    const response = await axios.patch(
      `/api/coffee-shops/${
        params.coffeeShopId
      }/orders/${orderId}?status=${statusValue.toLowerCase()}`
    );
    if (response.status === 200) {
      router.refresh();
      toast.success("Order status updated successfully");
    } else {
      toast.error("Error updating order status");
    }
  };

  return (
    <>
      <OrderModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        coffeeShopId={params.coffeeShopId as string}
      />

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Orders (${orders.length})`}
            description="Manage your orders here."
          />
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="mr-2">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Order status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={selectedStatus}
                  onValueChange={handleStatusChange}
                >
                  {orderStatus.map((status) => (
                    <DropdownMenuRadioItem
                      value={status.value}
                      key={status.value}
                    >
                      {status.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => setIsOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add new order
            </Button>
          </div>
        </div>
        <Separator />
        <div className="container mx-auto py-10">
          <div className="space-y-4">
            {orders.length > 0 ? (
              orders.map((order: Order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Badge>{order.orderStatus}</Badge>
                        <CardTitle>Order #{order.id}</CardTitle>
                      </div>
                      <p>{order.date}</p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p>
                      Client:{" "}
                      {order.customer.firstName + " " + order.customer.lastName}
                    </p>
                    <p>
                      Employee:{" "}
                      {order.employee.firstName + " " + order.employee.lastName}
                    </p>
                  </CardContent>

                  <CardFooter className="flex justify-between items-center">
                    <p>
                      <span className="font-bold leading-none">Total:</span>{" "}
                      <span>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 2,
                        }).format(order.total)}
                      </span>
                    </p>
                    <div className="flex items-center space-x-2">
                      {(order.orderStatus === "PENDING" ||
                        order.orderStatus === "IN_PROGRESS") && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="mr-2">
                              Update status <Edit className="h-4 w-4 ml-2" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Order status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                              onValueChange={(statusValue) =>
                                handleStatusEditChange(order.id, statusValue)
                              }
                            >
                              {orderStatus.map((status) => (
                                <DropdownMenuRadioItem
                                  key={status.value}
                                  value={status.value}
                                  disabled={order.orderStatus == status.value}
                                >
                                  {status.label}
                                </DropdownMenuRadioItem>
                              ))}
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}

                      <Link
                        href={`/${params.coffeeShopId}/orders/${order.id}`}
                        className={buttonVariants({ variant: "default" })}
                      >
                        View order
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Oops!</AlertTitle>
                <AlertDescription>
                  Looks like you have no orders around here.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
