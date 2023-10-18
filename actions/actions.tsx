const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export const getStore = async (
  coffeeShopId: string,
  accessToken: string | undefined
) => {
  if (!accessToken) {
    return;
  }
  const req = await fetch(`${BACKEND_URL}/api/coffee-shops/${coffeeShopId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await req.json();
};

export const getAdminStores = async (
  adminId: string | undefined,
  accessToken: string | undefined
) => {
  if (!accessToken) {
    return;
  }
  const req = await fetch(
    `${BACKEND_URL}/api/coffee-shops?adminId=${adminId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return await req.json();
};
