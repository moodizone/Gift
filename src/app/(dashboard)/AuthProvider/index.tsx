import * as React from "react";

import { serverFetch } from "@/lib/serverFetch";
import { UserMeResponse } from "@/services/type";
import Unauthorized from "../../Unauthorized";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Store from "./Store";
import { AppSidebar } from "./app-sidebar";
import { APIError } from "@/lib/fetch";

async function getMe() {
  const response = await serverFetch<UserMeResponse>("/user/me");
  return response;
}

async function AuthProvider({ children }: React.PropsWithChildren) {
  try {
    // check token validation
    const me = await getMe();

    return (
      <SidebarProvider>
        <Store me={me} />
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    );
  } catch (e) {
    if (e instanceof APIError && e.response.status === 401) {
      return <Unauthorized />;
    }
    throw e;
  }
}

export default AuthProvider;