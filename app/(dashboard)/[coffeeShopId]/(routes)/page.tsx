interface DashboardPageProps {
  params: { coffeeShopId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Store</p>
    </div>
  );
};

export default DashboardPage;
