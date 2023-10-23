import api from "@/lib/axios-interceptor";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; coffeeShopId: string };
}) => {
  let category: any;
  try {
    const res = await api.get(
      `/api/coffee-shops/${params.coffeeShopId}/categories/${params.categoryId}`
    );
    category = res.data;
  } catch (error) {
    category = null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
