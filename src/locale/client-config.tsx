"use client";
import * as React from "react";
import i18next from "i18next";
import { initReactI18next, I18nextProvider as IP } from "react-i18next";

import { fallbackLng, options } from "@/locale/options";
import { useAsync } from "react-use";
import Cookies from "js-cookie";

i18next.use(initReactI18next).init(options);

export function I18nextProvider({ children }: React.PropsWithChildren) {
  const { value } = useAsync(async () => {
    const cookie = Cookies.get("language");
    const lang = cookie === "fa" ? "fa" : fallbackLng;
    await i18next.changeLanguage(lang);
    return true;
  }, []);
  return <IP i18n={i18next}>{value ? children : null}</IP>;
}

export default i18next;
