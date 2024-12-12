import * as React from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import AppBreadcrumb from "./app-breadcrumb";

function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ms-1" />
          <AppBreadcrumb />
        </div>
      </header>
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        {children}
      </div>
    </>
  );
}

export default Layout;
