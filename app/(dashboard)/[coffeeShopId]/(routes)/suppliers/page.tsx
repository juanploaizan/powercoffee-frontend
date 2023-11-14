import { Pagination } from "@/types/schemas";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { getSuppliers } from "@/actions/get-pagination-data/get-suppliers";
import { getSuggestedSuppliers } from "@/actions/get-pagination-data/get-suggested-providers";
import { SuggestedSuppliersTable } from "./suggested-table";

const SuppliersPage = async ({
  params,
  searchParams,
}: {
  params: { coffeeShopId: string };
  searchParams?: { [key: string]: string | undefined };
}) => {
  const pageNumberParam = searchParams?.pageNumber
    ? searchParams.pageNumber
    : "0";
  const pageSizeParam = searchParams?.pageSize ? searchParams.pageSize : "5";

  const { data, pageNumber, pageSize, totalElements, totalPages, first, last } =
    await getSuppliers(params.coffeeShopId, pageNumberParam, pageSizeParam);
  const pagination: Pagination = {
    pageNumber,
    pageSize,
    totalElements,
    totalPages,
    first,
    last,
  };
  const suppliers = data;

  const suggestedSuppliers = (await getSuggestedSuppliers(
    params.coffeeShopId
  )) as any[];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Suppliers (${pagination.totalElements})`}
            description="Manage your suppliers here."
          />
          <Link
            className={buttonVariants({ variant: "default" })}
            href={`/${params.coffeeShopId}/suppliers/new`}
          >
            <Plus className="mr-2 h-4 w-4" /> Add new supplier
          </Link>
        </div>
        <Separator />
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={suppliers}
            pagination={pagination}
          />
          <div className="mt-4">
            <SuggestedSuppliersTable suggestedSuppliers={suggestedSuppliers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuppliersPage;
