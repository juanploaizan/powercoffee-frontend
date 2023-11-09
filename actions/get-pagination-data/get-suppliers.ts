import api from "@/lib/axios-interceptor";

export const getSuppliers = async (
  coffeeShopId: string,
  pageNumber: string,
  pageSize: string
) => {
  const response = await api
    .get(
      `/api/coffee-shops/${coffeeShopId}/suppliers?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => res.data);
  return response;
};
