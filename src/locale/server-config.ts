import { createInstance, i18n } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import { headers } from "next/headers";

import { options } from "@/locale/options";
import { fallbackLng } from "./detectLng";
import { language } from "@/services/type";

let i18nInstance: i18n | null = null;

export async function getI18nInstance() {
  const headersList = await headers();
  const languageHeader = headersList.get("x-user-language");
  const lang = languageHeader === language.fa ? language.fa : fallbackLng;

  if (!i18nInstance) {
    i18nInstance = createInstance();
    await i18nInstance.use(initReactI18next).init(options);
  }

  await i18nInstance.changeLanguage(lang);
  return i18nInstance;
}
