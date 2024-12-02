import * as React from "react";

import AuthProvider from "./AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";

function fallback() {
  return (
    <div className="h-screen flex flex-col space-y-4 p-8">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-12 w-48 bg-zinc-200 dark:bg-zinc-900 animate-pulse rounded-lg" />
        <Skeleton className="h-8 w-24 bg-zinc-200 dark:bg-zinc-900 animate-pulse rounded-md" />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <Skeleton className="h-96 w-full bg-zinc-200 dark:bg-zinc-900 animate-pulse rounded-lg" />
        </div>

        {/* Main Section */}
        <div className="flex-1 space-y-6">
          <Skeleton className="h-16 w-full bg-zinc-200 dark:bg-zinc-900 animate-pulse rounded-lg" />
          <Skeleton className="h-8 w-3/4 bg-zinc-200 dark:bg-zinc-900 animate-pulse rounded-lg" />
          <Skeleton className="h-40 w-full bg-zinc-200 dark:bg-zinc-900 animate-pulse rounded-lg" />
          <Skeleton className="h-8 w-1/2 bg-zinc-200 dark:bg-zinc-900 animate-pulse rounded-lg" />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="mt-auto">
        <Skeleton className="h-12 w-full bg-zinc-200 dark:bg-zinc-900 animate-pulse rounded-lg" />
      </div>
    </div>
  );
}

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <React.Suspense fallback={fallback()}>
      <AuthProvider>{children}</AuthProvider>
    </React.Suspense>
  );
}
