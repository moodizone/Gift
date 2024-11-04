"use client";
import Link from "next/link";
import clsx from "clsx";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface RouteType {
  href: string;
  title: string;
}
const routes: RouteType[] = [
  { href: "/overview", title: "Overview" },
  { href: "/projects", title: "Projects" },
  { href: "/products", title: "Products" },
  { href: "/settings", title: "Settings" },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => {
        const isActive = pathname === route.href;
        return (
          <Link
            key={route.href}
            href={route.href}
            className={clsx(
              "text-sm font-medium transition-colors hover:text-primary",
              {
                "text-muted-foreground": !isActive,
              }
            )}
          >
            {route.title}
          </Link>
        );
      })}
    </nav>
  );
}
