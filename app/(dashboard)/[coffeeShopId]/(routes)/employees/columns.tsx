"use client";

import { Employee } from "@/types/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ActionCell } from "./action-cell";

/*
 * Columns are where you define the core of
 * what your table will look like. They define
 * the data that will be displayed, how it
 * will be formatted, sorted and filtered.
 */

export const columns: ColumnDef<Employee>[] = [
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
    cell: (props) => <ActionCell {...props} />,
  },
];
