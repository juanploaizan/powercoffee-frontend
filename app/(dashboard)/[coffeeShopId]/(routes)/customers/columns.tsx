"use client";

import { Customer } from "@/types/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { DataTableColumnHeader } from "../../../../../components/ui/column-header";

/*
 * Columns are where you define the core of
 * what your table will look like. They define
 * the data that will be displayed, how it
 * will be formatted, sorted and filtered.
 */

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("firstName")}</div>;
    },
    enableHiding: false,
    enableSorting: true,
  },

  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("lastName")}</div>;
    },
    enableHiding: false,
    enableSorting: true,
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("email")}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("phoneNumber")}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;
      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(false);
      const router = useRouter();

      const onConfirm = async () => {
        try {
          setLoading(true);
          await axios.delete(
            `/api/coffee-shops/${customer.coffeeShopId}/customers/${customer.id}`
          );
          toast.success("Customer deleted.");
          router.refresh();
        } catch (error) {
          toast.error("An error occurred while deleting customer.");
        } finally {
          setOpen(false);
          setLoading(false);
        }
      };

      return (
        <>
          <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onConfirm}
            loading={loading}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/${customer.coffeeShopId}/customers/${customer.id}`}>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
