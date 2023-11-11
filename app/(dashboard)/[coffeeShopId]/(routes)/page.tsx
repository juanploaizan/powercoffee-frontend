import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CreditCard, DollarSign, Package, User } from "lucide-react";
import { CalendarDateRangePicker } from "./components/date-range-picker";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { addDays, format } from "date-fns";
import { getSalesCount } from "@/actions/get-sales-count";
import { getClientsCount } from "@/actions/get-clients-count";
import { getProductsOverview } from "@/actions/get-products-overview";
import { getRecentSales } from "@/actions/get-recent-sales";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";

interface DashboardPageProps {
  params: { coffeeShopId: string };
  searchParams: { [key: string]: string | undefined };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params,
  searchParams,
}) => {
  // get from and to dates from query params, and if not present, set default values
  const from = searchParams.from
    ? searchParams.from
    : format(addDays(new Date(), -30), "MM-dd-yyyy");
  const to = searchParams.to
    ? searchParams.to
    : format(new Date(), "MM-dd-yyyy");

  const totalRevenue = await getTotalRevenue(params.coffeeShopId, from, to);
  const salesCount = await getSalesCount(params.coffeeShopId, from, to);
  const customersCount = await getClientsCount(params.coffeeShopId, from, to);
  const productBar = await getProductsOverview(params.coffeeShopId, from, to);
  const recentSales = await getRecentSales(params.coffeeShopId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Dashboard"
            description="Overview of your coffee shop"
          />
          <CalendarDateRangePicker />
        </div>
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "COP",
                }).format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Registered customers
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{customersCount}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={productBar} />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                You made {salesCount} sales in the select period of time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales data={recentSales} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
