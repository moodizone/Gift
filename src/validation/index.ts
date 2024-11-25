import { z } from "zod";

import i18next from "@/locale/client-config";

import { gender, language, userRole } from "@/services/type";
import { ThemeEnum } from "@/lib/settings";

const customErrorMap: z.ZodErrorMap = (issue) => {
  switch (issue.code) {
    case z.ZodIssueCode.too_small:
      return {
        message: i18next.t("validation.too_small", {
          minimum: issue.minimum,
        }),
      };
    case z.ZodIssueCode.too_big:
      return {
        message: i18next.t("validation.too_big", {
          maximum: issue.maximum,
        }),
      };
    case z.ZodIssueCode.custom:
      return {
        message: i18next.t("validation.custom"),
      };
    case z.ZodIssueCode.invalid_enum_value:
      return {
        message: i18next.t("validation.invalid_enum_value"),
      };
    case z.ZodIssueCode.invalid_date:
      return {
        message: i18next.t("validation.invalid_date"),
      };
    default:
      return {
        message: i18next.t("validation.invalid_value"),
      };
  }
};

z.setErrorMap(customErrorMap);

const telSchema = z.string().min(3).max(256).optional();
const nameSchema = z.string().max(256).optional();
export const emailSchema = z.string().email().max(256);
const passwordSchema = z.string().min(6).max(256);
const roleSchema = z.nativeEnum(userRole).optional();
const genderSchema = z.nativeEnum(gender).optional();
const ageSchema = z.number().int().positive().optional();
const languageSchema = z.nativeEnum(language);
const themeSchema = z.nativeEnum(ThemeEnum);

export const appearanceSchema = z.object({
  theme: themeSchema,
  language: languageSchema,
});
export const createUserSchema = z.object({
  tel: telSchema,
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  gender: genderSchema,
  age: ageSchema,
  role: roleSchema,
});
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export const emailAvailabilitySchema = z.object({
  email: emailSchema,
});
