"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.coffeeShopId}`,
      label: "Overview",
      active: pathname === `/${params.coffeeShopId}`,
    },
    {
      href: `/${params.coffeeShopId}/orders`,
      label: "Orders",
      active: pathname === `/${params.coffeeShopId}/orders`,
    },
    {
      href: `/${params.coffeeShopId}/customers`,
      label: "Customers",
      active: pathname === `/${params.coffeeShopId}/customers`,
    },
    {
      href: `/${params.coffeeShopId}/employees`,
      label: "Employees",
      active: pathname === `/${params.coffeeShopId}/employees`,
    },
    {
      href: `/${params.coffeeShopId}/products`,
      label: "Products",
      active: pathname === `/${params.coffeeShopId}/products`,
    },
    {
      href: `/${params.coffeeShopId}/categories`,
      label: "Categories",
      active: pathname === `/${params.coffeeShopId}/categories`,
    },
    {
      href: `/${params.coffeeShopId}/suppliers`,
      label: "Suppliers",
      active: pathname === `/${params.coffeeShopId}/suppliers`,
    },
    {
      href: `/${params.coffeeShopId}/settings`,
      label: "Settings",
      active: pathname === `/${params.coffeeShopId}/settings`,
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
