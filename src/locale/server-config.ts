import { createInstance, i18n } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";

import { options } from "@/locale/options";

let i18nInstance: i18n | null = null;

export async function getI18nInstance() {
  if (!i18nInstance) {
    i18nInstance = createInstance();
    await i18nInstance.use(initReactI18next).init(options);
  }

  return i18nInstance;
}
