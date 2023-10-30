import api from "@/lib/axios-interceptor";
import { Employee, Pagination, PaginationResponse } from "@/types/schemas";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";

export const getEmployees = async (
  coffeeShopId: string,
  pageNumber: string,
  pageSize: string
): Promise<PaginationResponse<Employee>> => {
  const response: PaginationResponse<Employee> = await api
    .get(
      `/api/coffee-shops/${coffeeShopId}/employees?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => res.data);
  return response;
};

const EmployeesPage = async ({
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
    await getEmployees(params.coffeeShopId, pageNumberParam, pageSizeParam);
  const pagination: Pagination = {
    pageNumber,
    pageSize,
    totalElements,
    totalPages,
    first,
    last,
  };
  const employees = data;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Employees (${pagination.totalElements})`}
            description="Manage your employees here."
          />
          <Link
            className={buttonVariants({ variant: "default" })}
            href={`/${params.coffeeShopId}/employees/new`}
          >
            <Plus className="mr-2 h-4 w-4" /> Add new employee
          </Link>
        </div>
        <Separator />
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={employees}
            pagination={pagination}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
