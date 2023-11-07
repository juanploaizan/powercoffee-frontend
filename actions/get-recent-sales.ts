import api from "@/lib/axios-interceptor";

export const getRecentSales = async (coffeeShopId: string) => {
  return api
    .get(`/api/coffee-shops/${coffeeShopId}/get-most-recent-orders`)
    .then((response) => response.data)
    .catch((error) => []);
};
