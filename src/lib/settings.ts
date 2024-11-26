import { language } from "@/services/type";

export enum ThemeEnum {
  light = "light",
  dark = "dark",
}
export enum DirectionEnum {
  rtl = "rtl",
  ltr = "ltr",
}
export const fallbackTheme = ThemeEnum.dark;
export const fallbackLanguage = language.en;
export const fallbackDirection = DirectionEnum.ltr;

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
export function getDirection(lng: unknown): DirectionEnum {
  switch (lng) {
    case language.fa:
      return DirectionEnum.rtl;
    case language.en:
      return DirectionEnum.ltr;
    default:
      return fallbackDirection;
  }
}
