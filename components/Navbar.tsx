import { redirect } from "next/navigation";
import StoreSwitcher from "@/components/store-switcher";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { useSession } from "@/lib/user-session";
import api from "@/lib/axios-interceptor";
import { MainNav } from "@/components/main-nav";

const Navbar = async () => {
  const user = await useSession();

  if (!user) {
    redirect("api/auth/signin");
  }

  const getAdminStores = async () => {
    const res = await api.get(`/api/coffee-shops?adminId=${user.id}`);
    return res.data;
  };

  const stores = await getAdminStores();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/">
          <div className="relative z-20 flex items-center text-lg font-semibold mr-4">
            Powercoffee.
          </div>
        </Link>
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
