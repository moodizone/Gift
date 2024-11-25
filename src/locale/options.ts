import { fallbackLng } from "@/configs";
import en from "./en.json";
import fa from "./fa.json";

export const options = {
  resources: {
    fa: {
      translation: fa,
    },
    en: {
      translation: en,
    },
  },
  lng: "en",
  fallbackLng,
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
  },
};
