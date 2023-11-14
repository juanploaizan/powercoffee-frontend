import api from "@/lib/axios-interceptor";

export const getSuggestedSuppliers = async (coffeeShopId: string) => {
  const response = await api
    .get(`/api/coffee-shops/${coffeeShopId}/suppliers/suggested`)
    .then((res) => res.data)
    .catch((err) => []);
  return response;
};
