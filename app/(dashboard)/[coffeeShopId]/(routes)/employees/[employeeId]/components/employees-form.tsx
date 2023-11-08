"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CheckIcon, Trash } from "lucide-react";
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
import { genders } from "@/lib/combo-boxes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const formSchema = z.object({
  dni: z
    .string()
    .min(6, "DNI must be at least 6 characters")
    .max(10, "DNI must be at most 10 characters"),
  email: z
    .string()
    .email("Invalid email")
    .min(5, "Email must be at least 5 characters")
    .max(50, "Email must be at most 50 characters"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be 10 digits")
    .regex(/^[3][0-9]*$/, "Phone number must start with 3"),
  firstName: z
    .string()
    .min(2, "First name most be at least 2 characters")
    .max(30, "First name must be at most 30 characters"),
  lastName: z
    .string()
    .min(2, "Last name most be at least 2 characters")
    .max(30, "Last name must be at most 30 characters"),
  birthdate: z.string().length(10, "Birth date is required"),
  gender: z.string({
    required_error: "Please select a gender.",
  }),
  salary: z
    .string()
    .min(1, "Salary is required")
    .regex(/^\d+(?:\.\d{0,2})?$/, "Salary must be a number"),
  address: z
    .string()
    .min(2, "Address must be at least 2 characters")
    .max(70, "Address must be at most 70 characters"),
  hireDate: z.string().length(10, "Hire date is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface EmployeeFormProps {
  initialData: any;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit employee" : "Create employee";
  const description = initialData ? "Edit a employee." : "Add a new employee";
  const toastMessage = initialData ? "Employee updated." : "Employee created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      dni: "",
      email: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      salary: 0,
      address: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(
          `/api/coffee-shops/${params.coffeeShopId}/employees/${params.employeeId}`,
          data
        );
      } else {
        await axios.post(
          `/api/coffee-shops/${params.coffeeShopId}/employees`,
          data
        );
      }
      router.refresh();
      router.push(`/${params.coffeeShopId}/employees`);
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
        `/api/coffee-shops/${params.coffeeShopId}/employees/${params.employeeId}`
      );
      router.refresh();
      router.push(`/${params.coffeeShopId}/employees`);
      toast.success("Employee deleted.");
    } catch (error: any) {
      toast.error("An error ocurred while deleting the employee.");
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
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identification Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Employee's identification number"
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
                      placeholder="Employee's email"
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
                      placeholder="Employee's phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Employee's first name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Employee's last name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Date</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="date"
                      placeholder="Employee's birth date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Gender</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? genders.find(
                                (gender) => gender.value === field.value
                              )?.label
                            : "Select gender"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search gender..."
                          className="h-9"
                        />
                        <CommandEmpty>No gender found.</CommandEmpty>
                        <CommandGroup>
                          {genders.map((gender) => (
                            <CommandItem
                              value={gender.label}
                              key={gender.value}
                              onSelect={() => {
                                form.setValue("gender", gender.value);
                              }}
                            >
                              {gender.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  gender.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Employee's salary"
                      // Return the number value of the field
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Employee's address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hireDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hire Date</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="date"
                      placeholder="Employee's hire date"
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
