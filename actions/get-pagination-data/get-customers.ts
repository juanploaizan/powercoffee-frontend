import api from "@/lib/axios-interceptor";

export const getCustomers = async (
  coffeeShopId: string,
  pageNumber: string,
  pageSize: string
) => {
  const response = await api
    .get(
      `/api/coffee-shops/${coffeeShopId}/customers?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => res.data);
  return response;
};
