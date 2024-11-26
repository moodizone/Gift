import * as React from "react";

import { generateMeta } from "@/lib/metadata";
import LoginForm from "./Form";
import { initI18nInstance } from "@/locale/server-config";

export const metadata = generateMeta({
  title: "Login",
  description:
    "Securely log in to your account to access your personalized dashboard and settings.",
});

async function page() {
  const i18n = await initI18nInstance();
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {i18n.t("welcome-back")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {i18n.t("Sign in to explore personalized features and more.")}
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default page;
