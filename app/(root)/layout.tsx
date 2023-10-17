import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function SetupPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("api/auth/signin");
  }

  let coffeeShopId; // Declarar la variable fuera del bloque try

  try {
    const req = await fetch(
      `${process.env.BACKEND_URL}/api/coffee-shops/admin/${session?.user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );

    const coffeeShop = await req.json();
    coffeeShopId = coffeeShop.id; // Asignar el valor dentro del bloque try
  } catch (error) {}

  if (coffeeShopId) {
    redirect(`/${coffeeShopId}`); // Realizar el redireccionamiento fuera del bloque try
  }

  return <>{children}</>;
}
