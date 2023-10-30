import api from "@/lib/axios-interceptor";
import { EmployeeForm } from "./components/employees-form";

const EmployeePage = async ({
  params,
}: {
  params: { employeeId: string; coffeeShopId: string };
}) => {
  let employee: any;
  try {
    const res = await api.get(
      `/api/coffee-shops/${params.coffeeShopId}/employees/${params.employeeId}`
    );
    employee = res.data;
  } catch (error) {
    employee = null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EmployeeForm initialData={employee} />
      </div>
    </div>
  );
};

export default EmployeePage;
