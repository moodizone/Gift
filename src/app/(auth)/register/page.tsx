import * as React from "react";

import RegisterForm from "../register/Form";
import { generateMeta } from "@/lib/metadata";
import { initI18nInstance } from "@/locale/server-config";
import Terms from "./Terms";

export const metadata = generateMeta({
  title: "Register",
  description:
    "Sign up to join our platform and unlock exclusive features tailored to your needs.",
});

async function page() {
  const i18n = await initI18nInstance();
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {i18n.t("Join Us Today!")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {i18n.t("Register now to enjoy exclusive benefits and features.")}
          </p>
        </div>
        <RegisterForm />
        <Terms />
      </div>
    </div>
  );
}

export default page;
