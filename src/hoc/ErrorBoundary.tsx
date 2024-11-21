"use client";
import * as React from "react";
import { Terminal } from "lucide-react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

export function FallbackUI({ error, resetErrorBoundary }: FallbackProps) {
  // const router = useRouter();
  return (
    <Alert className=" flex flex-col">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Error!</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p> {"Something went wrong, That's all we know!"}</p>
        <code className="bg-zinc-200 dark:bg-zinc-900 p-3 rounded">{error?.message}</code>
        <Button className="w-full" onClick={resetErrorBoundary}>
          Reset
        </Button>
      </AlertDescription>
    </Alert>
  );
}

function ErrorBoundaryProvider({ children }: React.PropsWithChildren) {
  return (
    <ErrorBoundary
      fallbackRender={(props) => {
        return (
          <div className="h-full w-full flex justify-center items-center">
            <div className="max-w-md mx-auto">
              <FallbackUI {...props} />
            </div>
          </div>
        );
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundaryProvider;
