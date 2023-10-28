import api from "@/lib/axios-interceptor";
import { ProductsForm } from "./components/products-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; coffeeShopId: string };
}) => {
  let product: any;
  try {
    const res = await api.get(
      `/api/coffee-shops/${params.coffeeShopId}/products/${params.productId}`
    );
    product = res.data;
  } catch (error) {
    product = null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsForm initialData={product} />
      </div>
    </div>
  );
};

export default ProductPage;
