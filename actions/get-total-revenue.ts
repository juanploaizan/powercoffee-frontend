import api from "@/lib/axios-interceptor";

export const getTotalRevenue = async (
  coffeeShopId: string,
  from: string,
  to: string
) => {
  return api
    .get(`/api/coffee-shops/${coffeeShopId}/get-revenue?from=${from}&to=${to}`)
    .then((response) => response.data)
    .catch((error) => 0);
};
