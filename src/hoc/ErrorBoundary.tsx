"use client";
import * as React from "react";
import { Terminal } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function ErrorBoundaryProvider({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div className="h-full w-full flex justify-center items-center">
            <div className="max-w-md mx-auto">
              <Alert className=" flex flex-col">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                  <p> {t("Something went wrong, That's all we know!")}</p>
                  <code className="bg-zinc-200 dark:bg-zinc-900 p-3 rounded">
                    {error?.message}
                  </code>
                  <Button className="w-full" onClick={router.refresh}>
                    {t("reload")}
                  </Button>
                </AlertDescription>
              </Alert>
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
