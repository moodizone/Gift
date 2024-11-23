"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function UpperLink() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <Link
      href={isLoginPage ? "/register" : "/login"}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute right-4 top-4 md:right-8 md:top-8"
      )}
    >
      {isLoginPage ? t("Register") : t("Login")}
    </Link>
  );
}

export default UpperLink;
