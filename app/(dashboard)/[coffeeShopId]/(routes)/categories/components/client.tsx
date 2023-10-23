"use client";

import { useParams, useRouter } from "next/navigation";
import { columns, CategoryColumn } from "./columns";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Metadata } from "next";

export const meta: Metadata = {
  title: "Categories - Powercoffee",
  description: "Manage your categories for your coffee shop.",
};

interface CategoryClientProps {
  data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage your categories for your coffee shop."
        />
        <Button
          onClick={() => router.push(`/${params.coffeeShopId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add new category
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
