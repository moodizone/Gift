import * as React from "react";

import { serverFetch } from "@/lib/serverFetch";
import { UserMeResponse } from "@/services/type";
import Unauthorized from "../../Unauthorized";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Store from "./Store";
import { AppSidebar } from "./app-sidebar";

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
  } catch {
    // redirect to login page
    return <Unauthorized />;
  }
}

export default AuthProvider;
