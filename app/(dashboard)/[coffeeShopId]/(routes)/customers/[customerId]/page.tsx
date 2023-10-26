import api from "@/lib/axios-interceptor";
import { CustomerForm } from "./components/customer-form";

const CustomerPage = async ({
  params,
}: {
  params: { customerId: string; coffeeShopId: string };
}) => {
  let customer: any;
  try {
    const res = await api.get(
      `/api/coffee-shops/${params.coffeeShopId}/customers/${params.customerId}`
    );
    customer = res.data;
  } catch (error) {
    customer = null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CustomerForm initialData={customer} />
      </div>
    </div>
  );
};

export default CustomerPage;
