import api from "@/lib/axios-interceptor";
import { Product, Pagination, PaginationResponse } from "@/types/schemas";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";

export const getProducts = async (
  coffeeShopId: string,
  pageNumber: string,
  pageSize: string
): Promise<PaginationResponse<Product>> => {
  const response: PaginationResponse<Product> = await api
    .get(
      `/api/coffee-shops/${coffeeShopId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => res.data);
  return response;
};

const ProductsPage = async ({
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
    await getProducts(params.coffeeShopId, pageNumberParam, pageSizeParam);
  const pagination: Pagination = {
    pageNumber,
    pageSize,
    totalElements,
    totalPages,
    first,
    last,
  };
  const products = data;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Products (${pagination.totalElements})`}
            description="Manage your products here."
          />
          <Link
            className={buttonVariants({ variant: "default" })}
            href={`/${params.coffeeShopId}/products/new`}
          >
            <Plus className="mr-2 h-4 w-4" /> Add new product
          </Link>
        </div>
        <Separator />
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={products}
            pagination={pagination}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
