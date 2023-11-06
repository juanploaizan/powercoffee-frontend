import api from "@/lib/axios-interceptor";
import { SupplierForm } from "./components/suppliers-form";

const SupplierPage = async ({
  params,
}: {
  params: { supplierId: string; coffeeShopId: string };
}) => {
  let supplier: any;
  try {
    const res = await api.get(
      `/api/coffee-shops/${params.coffeeShopId}/suppliers/${params.supplierId}`
    );
    supplier = res.data;
  } catch (error) {
    supplier = null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SupplierForm initialData={supplier} />
      </div>
    </div>
  );
};

export default SupplierPage;
