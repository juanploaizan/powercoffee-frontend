import api from "@/lib/axios-interceptor";

export const getProductsOverview = async (
  coffeeShopId: string,
  from: string,
  to: string
) => {
  return api
    .get(
      `/api/coffee-shops/${coffeeShopId}/get-most-sell-products?from=${from}&to=${to}`
    )
    .then((response) => response.data)
    .catch((error) => []);
};
