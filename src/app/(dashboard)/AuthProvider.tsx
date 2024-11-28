import * as React from "react";

import { MainNav } from "@/components/Navbar/MainNav";
import { Search } from "@/components/Navbar/Search";
import { UserNav } from "@/components/Navbar/UserNav";
import { serverFetch } from "@/lib/serverFetch";
import { UserMeResponse } from "@/services/type";
import Store from "./Store";
import RedirectToLoginPage from "../RedirectToLoginPage";

async function getMe() {
  const response = await serverFetch<UserMeResponse>("/user/me");
  return response;
}

async function AuthProvider({ children }: React.PropsWithChildren) {
  try {
    // check token validation
    const me = await getMe();

    return (
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="hidden ms-auto md:flex items-center gap-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <Store me={me} />
        <div className="flex-1">{children}</div>
      </div>
    );
  } catch {
    // redirect to login page
    return <RedirectToLoginPage />;
  }
}

export default AuthProvider;
