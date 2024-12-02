import { createInstance, i18n } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";

import { options } from "@/locale/options";
import { cookies } from "next/headers";
import { getLanguage } from "@/lib/settings";

let i18nInstance: i18n | null = null;

export async function initI18nInstance() {
  const cks = await cookies();
  const lang = getLanguage(cks.get("language")?.value);

  if (!i18nInstance) {
    i18nInstance = createInstance();
    await i18nInstance.use(initReactI18next).init(options);
  }

  if (i18nInstance.language !== lang) {
    await i18nInstance.changeLanguage(lang);
  }

  return i18nInstance;
}
