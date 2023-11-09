import { Pagination } from "@/types/schemas";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { getCustomers } from "@/actions/get-pagination-data/get-customers";

const CustomersPage = async ({
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
    await getCustomers(params.coffeeShopId, pageNumberParam, pageSizeParam);
  const pagination: Pagination = {
    pageNumber,
    pageSize,
    totalElements,
    totalPages,
    first,
    last,
  };
  const customers = data;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Customers (${pagination.totalElements})`}
            description="Manage your customers here."
          />
          <Link
            className={buttonVariants({ variant: "default" })}
            href={`/${params.coffeeShopId}/customers/new`}
          >
            <Plus className="mr-2 h-4 w-4" /> Add new customer
          </Link>
        </div>
        <Separator />
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={customers}
            pagination={pagination}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
