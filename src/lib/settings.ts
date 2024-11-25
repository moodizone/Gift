import { language } from "@/services/type";

export enum ThemeEnum {
  light = "light",
  dark = "dark",
}
export enum DirectionType {
  rtl = "rtl",
  ltr = "ltr",
}
export const fallbackTheme = ThemeEnum.dark;
export const fallbackLanguage = language.en;
export const fallbackDirection = DirectionType.ltr;

export function getTheme(theme: unknown): ThemeEnum {
  switch (theme) {
    case ThemeEnum.dark:
      return ThemeEnum.dark;
    case ThemeEnum.light:
      return ThemeEnum.light;
    default:
      return fallbackTheme;
  }
}
export function getLanguage(lng: unknown): language {
  switch (lng) {
    case language.fa:
      return language.fa;
    case language.en:
      return language.en;
    default:
      return fallbackLanguage;
  }
}
export function getDirection(lng: unknown): DirectionType {
  switch (lng) {
    case DirectionType.rtl:
      return DirectionType.rtl;
    case DirectionType.ltr:
      return DirectionType.ltr;
    default:
      return fallbackDirection;
  }
}
