import { getAdminStores } from "@/actions/actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import StoreSwitcher from "@/components/store-switcher";
import UserAccountNav from "@/components/UserAccountNav";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("api/auth/signin");
  }

  const stores = await getAdminStores(
    session?.user.id,
    session?.user.accessToken
  );

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/">
          <div className="relative z-20 flex items-center text-lg font-semibold mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Powercoffee.
          </div>
        </Link>
        <StoreSwitcher items={stores} />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserAccountNav
            name={session.user.username}
            email={session.user.email}
            imageUrl=""
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
