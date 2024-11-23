import en from "./en.json";
import fa from "./fa.json";

export const fallbackLng = "en";
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
