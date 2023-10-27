"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { avatars } from "@/lib/combo-boxes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const formSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters.")
    .max(20, "Username must be less than 20 characters.")
    .regex(
      /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      "Username can only contain letters, numbers, underscores and dashes."
    ),
  email: z
    .string()
    .email("Invalid email")
    .min(1, "Email is required")
    .max(50, "Email must be less than 50 characters."),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be 10 digits.")
    .regex(
      /^[3][0-9]*$/,
      "Phone number must start with 3 and contain only digits."
    ),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(30, "First name must be less than 30 characters."),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(30, "Last name must be less than 30 characters."),
  avatarNumber: z.number().nullable(),
});

type AccountFormValues = z.infer<typeof formSchema>;

interface AccountFormProps {
  initialData: any;
}

export const AccountSettingsForm: React.FC<AccountFormProps> = ({
  initialData,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  async function onSubmit(data: AccountFormValues) {
    setLoading(true);
    try {
      await axios.put(`/api/users/${initialData.id}`, data);
      router.refresh();
      toast.success("Account information updated successfully.");
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Enter your first name"
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
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Enter your last name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Enter your username"
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
                  placeholder="Enter your email"
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
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Enter your phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatarNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Avatar</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
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
                        ? avatars.find((avatar) => avatar.value === field.value)
                            ?.label
                        : "Select avatar"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search avatar..." />
                    <CommandEmpty>No avatar found.</CommandEmpty>
                    <CommandGroup>
                      {avatars.map((avatar) => (
                        <CommandItem
                          value={avatar.label}
                          key={avatar.value}
                          onSelect={() => {
                            form.setValue("avatarNumber", avatar.value);
                            setOpen(false);
                          }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex">
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                avatar.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {avatar.label}
                          </div>

                          <Avatar>
                            <AvatarImage src={avatar.path} alt="@avatar" />
                            <AvatarFallback>
                              {avatar.label.charAt(0).toUpperCase() +
                                avatar.label.charAt(1).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the avatar that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="ml-auto" type="submit">
          Save changes
        </Button>
      </form>
    </Form>
  );
};
