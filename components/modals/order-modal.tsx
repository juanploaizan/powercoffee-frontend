"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ComboBoxOption, Product } from "@/types/schemas";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  coffeeShopId: string;
}

const formSchema = z.object({
  orderStatus: z.string().optional(),
  customerId: z.string({
    required_error: "Please select a customer.",
  }),
  employeeId: z.string({
    required_error: "Please select an employee.",
  }),
  orderDetails: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number(),
      })
    )
    .optional(),
});

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  coffeeShopId,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderStatus: "PENDING",
    },
  });
  const [orderDetails, setOrderDetails] = useState<
    { productId: string; quantity: number }[]
  >([]);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchCustomers = async (coffeeShopId: string) => {
      const response = await axios
        .get(`/api/coffee-shops/${coffeeShopId}/customers`)
        .then((res) => res.data.data)
        .catch((err) => []);
      const customers = response.map((customer: any) => ({
        label: customer.firstName + " " + customer.lastName,
        value: customer.id,
      }));
      setCustomers(customers);
    };

    const fetchEmployees = async (coffeeShopId: string) => {
      const response = await axios
        .get(`/api/coffee-shops/${coffeeShopId}/employees`)
        .then((res) => res.data.data)
        .catch((err) => []);
      const employees = response.map((employee: any) => ({
        label: employee.firstName + " " + employee.lastName,
        value: employee.id,
      }));
      setEmployees(employees);
    };

    const fetchProducts = async (coffeeShopId: string) => {
      const response = await axios
        .get(`/api/coffee-shops/${coffeeShopId}/products`)
        .then((res) => res.data.data)
        .catch((err) => []);
      setProducts(response);
    };

    if (isMounted) {
      fetchCustomers(coffeeShopId);
      fetchEmployees(coffeeShopId);
      fetchProducts(coffeeShopId);
    }
  }, [isMounted, coffeeShopId]);

  if (!isMounted) {
    return null;
  }

  const handleIncrease = (product: Product) => {
    const productId = product.id;

    let isPresent: boolean = orderDetails.some(
      (orderDetail: any) => orderDetail.productId === productId
    );

    console.log("El producto", product, "está presente?", isPresent);

    if (isPresent) {
      const newOrderDetails = orderDetails.map((orderDetail: any) => {
        if (orderDetail.productId === productId) {
          return {
            ...orderDetail,
            quantity: orderDetail.quantity + 1,
          };
        }
        return orderDetail;
      });
      setOrderDetails(newOrderDetails);
      form.setValue("orderDetails", newOrderDetails);
      console.log;
    } else {
      const newOrderDetails = [
        ...orderDetails,
        {
          productId: productId,
          quantity: 1,
        },
      ];
      setOrderDetails(newOrderDetails);
      form.setValue("orderDetails", newOrderDetails);
    }
  };

  const handleDecrease = (product: Product) => {
    const productId = product.id;

    let isPresent: boolean = orderDetails.some(
      (orderDetail: any) => orderDetail.productId === productId
    );
    console.log("El producto", product, "está presente?", isPresent);

    if (isPresent) {
      const newOrderDetails = orderDetails.map((orderDetail: any) => {
        if (orderDetail.productId === productId) {
          return {
            ...orderDetail,
            quantity: orderDetail.quantity - 1,
          };
        }
        return orderDetail;
      });

      // Remove the order detail if the quantity is 0
      const filteredOrderDetails = newOrderDetails.filter(
        (orderDetail: any) => orderDetail.quantity > 0
      );
      setOrderDetails(filteredOrderDetails);
      form.setValue("orderDetails", filteredOrderDetails);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.orderDetails || values.orderDetails.length === 0) {
      toast.error("Please select at least one product.");
      return;
    } else {
      const response = await axios.post(
        `/api/coffee-shops/${coffeeShopId}/orders`,
        values
      );

      if (response.status === 200) {
        onClose();
        router.refresh();
        toast.success("Order created successfully.");
      } else {
        toast.error("An error occurred while creating the order.");
      }
    }
  };

  return (
    <Modal
      title="Create Order"
      description="Create a new order"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ScrollArea className="h-[500px]">
        <div>
          <div className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-4 space-y-6"
              >
                {/* customer ID */}
                <FormField
                  control={form.control}
                  name="customerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the order's customer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {customers.length > 0 ? (
                            customers.map((customer: ComboBoxOption) => (
                              <SelectItem
                                key={customer.value}
                                value={customer.value}
                              >
                                {customer.label}
                              </SelectItem>
                            ))
                          ) : (
                            <Link href={`/${coffeeShopId}/customers/new`}>
                              <SelectItem value="no-customers" disabled>
                                <div className="flex justify-start items-center">
                                  <Plus className="w-4 h-4 mr-2" /> Create a
                                  customer
                                </div>
                              </SelectItem>
                            </Link>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* employee ID */}
                <FormField
                  control={form.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the order's employee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employees.map((employee: ComboBoxOption) => (
                            <SelectItem
                              key={employee.value}
                              value={employee.value}
                            >
                              {employee.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Products</FormLabel>
                  <ScrollArea className="w-[430px] rounded-md border">
                    <div className="flex w-max space-x-4 p-4">
                      {products.map((product: Product) => {
                        const orderDetail = orderDetails.find(
                          (orderDetail: any) =>
                            orderDetail.productId === product.id
                        );

                        const quantity = orderDetail ? orderDetail.quantity : 0;

                        return (
                          <Card className={cn("w-[200px]")} key={product.id}>
                            <CardHeader className="h-[168px] justify-between">
                              <CardTitle className="text-center">
                                {product.name}
                              </CardTitle>
                              <div className="flex justify-center">
                                <Avatar>
                                  <AvatarImage
                                    className="h-10 w-10 rounded-full"
                                    src={product.imageUrl}
                                  />
                                  <AvatarFallback>PC</AvatarFallback>
                                </Avatar>
                              </div>
                              <div>
                                <CardDescription>
                                  {product.description}
                                </CardDescription>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                <div className="space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                    {new Intl.NumberFormat("en-IN", {
                                      style: "currency",
                                      currency: "COP",
                                      minimumFractionDigits: 2,
                                    }).format(product.salePrice)}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="justify-center">
                              <div className="flex items-center justify-center space-x-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 shrink-0 rounded-full"
                                  disabled={quantity <= 0}
                                  onClick={() => handleDecrease(product)}
                                >
                                  <Minus className="h-4 w-4" />
                                  <span className="sr-only">Decrease</span>
                                </Button>
                                <div className="flex-1 text-center">
                                  <div className="text-2xl font-bold tracking-tighter">
                                    {quantity}
                                  </div>
                                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                                    Units
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 shrink-0 rounded-full"
                                  disabled={quantity >= product.stock}
                                  onClick={() => handleIncrease(product)}
                                >
                                  <Plus className="h-4 w-4" />
                                  <span className="sr-only">Increase</span>
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        );
                      })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
                <div className="flex justify-center">
                  <Button className="w-[200px]" type="submit">
                    Create order
                  </Button>
                </div>
              </form>
            </Form>
            <Card className="">
              <CardHeader className="justify-between">
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Product</div>
                    <div className="text-sm font-medium">Quantity x Price</div>
                  </div>
                  {orderDetails.map((orderDetail: any) => {
                    const product = products.find(
                      (product: Product) => product.id === orderDetail.productId
                    );
                    return (
                      <div
                        key={orderDetail.productId}
                        className="flex justify-between"
                      >
                        <div className="text-sm font-medium">
                          {product?.name}
                        </div>
                        <div className="text-sm font-medium">
                          {orderDetail.quantity} x{" "}
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 2,
                          }).format(product?.salePrice)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <div className="text-sm font-medium">Total</div>
                <div className="text-sm font-medium">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 2,
                  }).format(
                    orderDetails.reduce((acc, orderDetail) => {
                      const product = products.find(
                        (product: Product) =>
                          product.id === orderDetail.productId
                      );
                      return (
                        acc + orderDetail.quantity * product?.salePrice || 0
                      );
                    }, 0)
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </Modal>
  );
};
