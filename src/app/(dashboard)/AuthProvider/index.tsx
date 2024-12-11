import * as React from "react";

import { serverFetch } from "@/lib/serverFetch";
import { UserMeResponse } from "@/services/type";
import Unauthorized from "../../Unauthorized";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Store from "./Store";

async function getMe() {
  const response = await serverFetch<UserMeResponse>("/user/me");
  return response;
}

async function AuthProvider({ children }: React.PropsWithChildren) {
  try {
    // check token validation
    const me = await getMe();

    return (
      <>
        <Store me={me} />
        <SidebarProvider open>
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </>
    );
  } catch {
    // redirect to login page
    return <Unauthorized />;
  }
}

export default AuthProvider;
