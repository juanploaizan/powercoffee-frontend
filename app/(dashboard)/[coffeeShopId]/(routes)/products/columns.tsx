"use client";

import { Product } from "@/types/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../../../../../components/ui/column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ActionCell } from "./action-cell";

/*
 * Columns are where you define the core of
 * what your table will look like. They define
 * the data that will be displayed, how it
 * will be formatted, sorted and filtered.
 */

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "imageUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              className="h-10 w-10 rounded-full"
              src={row.getValue("imageUrl")}
            />
            <AvatarFallback>PC</AvatarFallback>
          </Avatar>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
    enableHiding: false,
    enableSorting: false,
  },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("description")}</div>;
    },
    enableHiding: true,
    enableSorting: true,
  },

  {
    accessorKey: "purchasePrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchase price" />
    ),
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("purchasePrice")}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "salePrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sale price" />
    ),
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("salePrice")}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("stock")}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: (props) => <ActionCell {...props} />,
  },
];
