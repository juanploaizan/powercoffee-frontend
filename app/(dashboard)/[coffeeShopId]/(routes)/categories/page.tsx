import api from "@/lib/axios-interceptor";
import { CategoryClient } from "./components/client";

const CategoriesPage = async ({
  params,
}: {
  params: { coffeeShopId: string };
}) => {
  const categories = await api
    .get("/api/coffee-shops/" + params.coffeeShopId + "/categories")
    .then((res) => res.data);

  const formattedCategories = categories.map((category: any) => {
    return {
      ...category,
      createdAt: new Date(category.createdAt).toLocaleString(),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
