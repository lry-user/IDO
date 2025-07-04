import { z } from "zod";
import { useTranslations } from "next-intl";

export const createZodSchema = (t: ReturnType<typeof useTranslations>) => {
  return {
    email: () => 
      z.string({
        required_error: t("validation.email.required"),
      }).email(t("validation.email.invalid")),
      
    password: (minLength = 8) =>
      z.string({
        required_error: t("validation.password.required"),
      }).min(minLength, t("validation.password.min", { length: minLength })),
      
    code: () =>
      z.string({
        required_error: t("validation.code.required"), 
      }).min(1, t("validation.code.invalid")),
      
    inviteCode: (minLength = 2) =>
      z.string({
        required_error: t("validation.invite_code.required"),
      }).min(minLength, t("validation.invite_code.min", { length: minLength }))
  };
}; 