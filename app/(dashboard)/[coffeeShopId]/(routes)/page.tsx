import { getStore } from "@/actions/actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface DashboardPageProps {
  params: { coffeeShopId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const session = await getServerSession(authOptions);

  const store = await getStore(params.coffeeShopId, session?.user.accessToken);

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Store: {store.name}</p>
    </div>
  );
};

export default DashboardPage;
