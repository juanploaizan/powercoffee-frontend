"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  nit: z
    .string()
    .min(1, "NIT is required")
    .max(10, "NIT must be 10 digits")
    .regex(/^[0-9]*$/, "NIT must be a number"),
  email: z
    .string()
    .email("Invalid email")
    .min(5, "Email must be at least 5 characters")
    .max(50, "Email must be 50 characters"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be 10 digits")
    .regex(/^[3][0-9]*$/, "Phone number must start with 3"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be less than 30 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface SupplierFormProps {
  initialData: any;
}

export const SupplierForm: React.FC<SupplierFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit supplier" : "Create supplier";
  const description = initialData ? "Edit a supplier." : "Add a new supplier";
  const toastMessage = initialData ? "Supplier updated." : "Supplier created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      dni: "",
      email: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(
          `/api/coffee-shops/${params.coffeeShopId}/suppliers/${params.supplierId}`,
          data
        );
      } else {
        await axios.post(
          `/api/coffee-shops/${params.coffeeShopId}/suppliers`,
          data
        );
      }
      router.refresh();
      router.push(`/${params.coffeeShopId}/suppliers`);
      toast.success(toastMessage);
    } catch (error: any) {
      const errorMessage = error?.response?.data || "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/coffee-shops/${params.coffeeShopId}/suppliers/${params.supplierId}`
      );
      router.refresh();
      router.push(`/${params.coffeeShopId}/suppliers`);
      toast.success("Supplier deleted.");
    } catch (error: any) {
      toast.error("An error ocurred while deleting the supplier.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="nit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIT</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Supplier's NIT"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Supplier's name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Supplier's email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Supplier's phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
