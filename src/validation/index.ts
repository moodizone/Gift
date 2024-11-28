import { z } from "zod";

import i18next from "@/locale/client-config";

import { gender, language } from "@/services/type";
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

const telSchema = z.string().min(3).max(256);
const firstNameSchema = z.string().max(256);
const lastNameSchema = z.string().max(256);
const bioSchema = z.string().max(1000);
const addressSchema = z.string().max(1000);
export const emailSchema = z.string().email().max(256);
const passwordSchema = z.string().min(6).max(256);
const genderSchema = z.nativeEnum(gender);
const languageSchema = z.nativeEnum(language);
const themeSchema = z.nativeEnum(ThemeEnum);
const dateSchema = z.string().datetime().pipe(z.coerce.date());
const boundedDateSchema = dateSchema.superRefine((date, { path, addIssue }) => {
  const fieldName = `${path[0]}`;

  // reject future date
  if (date > new Date()) {
    addIssue({
      code: z.ZodIssueCode.custom,
      path,
      message: `${fieldName} cannot be in the future`,
    });
  }

  const hundredYearsAgo = new Date();
  hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 200);

  // reject too old date
  if (date < hundredYearsAgo) {
    addIssue({
      code: z.ZodIssueCode.custom,
      path,
      message: `${fieldName} cannot be more than 200 years ago`,
    });
  }
});
const optionalBoundedDateSchema = z
  .string()
  .optional()
  .refine((value) => {
    if (!Boolean(value)) return true;

    const { success } = boundedDateSchema.safeParse(value);
    return success;
  });
const optionalTelSchema = z
  .string()
  .optional()
  .refine((value) => {
    if (!Boolean(value)) return true;

    const { success } = telSchema.safeParse(value);
    return success;
  });

export const appearanceSchema = z.object({
  theme: themeSchema,
  language: languageSchema,
});
export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export const emailAvailabilitySchema = z.object({
  email: emailSchema,
});
export const updateUserSchema = z.object({
  tel: optionalTelSchema,
  firstName: firstNameSchema.optional(),
  lastName: lastNameSchema.optional(),
  gender: genderSchema.optional(),
  birthday: optionalBoundedDateSchema,
  bio: bioSchema.optional(),
  address: addressSchema.optional(),
});
