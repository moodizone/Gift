import * as React from "react";

import UpperLink from "./UpperLink";
import { getI18nInstance } from "@/locale/server-config";

export default async function AuthLayout({
  children,
}: React.PropsWithChildren) {
  const i18n = await getI18nInstance();
  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center relative p-3 md:p-0">
        <UpperLink />
        {children}
      </div>
      <div className="hidden md:flex bg-zinc-900 p-8 flex-col">
        <div className="flex text-lg text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="me-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Acme Inc
        </div>
        <div className="mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-white">
              &ldquo;
              {i18n.t(
                "This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before."
              )}
              &rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
