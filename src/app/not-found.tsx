import Link from "next/link";

import { initI18nInstance } from "@/locale/server-config";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import BackButton from "@/components/BackButton";

export default async function Component() {
  const i18n = await initI18nInstance();
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {i18n.t("Oops! Lost in Cyberspace")}
          </h1>
          <p className="text-gray-500">
            {i18n.t(
              "Looks like you've ventured into the unknown digital realm."
            )}
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
          <div>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-[180px]"
              )}
              prefetch={false}
            >
              {"Return to Home"}
            </Link>
          </div>
          <div>
            <BackButton />
          </div>
        </div>
      </div>
    </div>
  );
}
