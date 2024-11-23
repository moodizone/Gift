import { language } from "@/services/type";

export const fallbackLng = language.en;

export function detectLng(lng: unknown): language {
  switch (lng) {
    case "fa":
      return language.fa;
    case "en":
      return language.en;
    default:
      return fallbackLng;
  }
}
