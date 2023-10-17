import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { coffeeShopId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("api/auth/signin");
  }

  let coffeeShopId;

  console.log("params coffee: " + params.coffeeShopId);

  try {
    const req = await fetch(
      `${process.env.BACKEND_URL}/api/coffee-shops/${params.coffeeShopId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    const coffeeShop = await req.json();
    coffeeShopId = coffeeShop.id;
  } catch (error) {}

  if (!coffeeShopId) {
    redirect(`/`);
  }

  return (
    <>
      <div>This will be a Navbar</div>
      {children}
    </>
  );
}
