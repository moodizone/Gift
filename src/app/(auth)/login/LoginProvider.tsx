"use client";

import * as React from "react";
import z from "zod";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import { login } from "@/services/auth";
import { useUserSlice } from "@/store/user";
import { loginSchema } from "@/validation";
import { useTranslation } from "react-i18next";
import LoginForm from "./Form";

export type LoginFormType = z.infer<typeof loginSchema>;
const defaultValues: LoginFormType = {
  email: "",
  password: "",
};

function LoginProvider() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { login: dispatch } = useUserSlice();
  const email = searchParam.get("email");
  const initialValues: LoginFormType = {
    email: email ? decodeURIComponent(email) : defaultValues.email,
    password: defaultValues.password,
  };

  async function onSubmit({ email, password }: LoginFormType) {
    const response = await login({ email, password });
    if (response) {
      // store user data in slice
      dispatch(response);

      Cookies.set("token", response.token, { expires: 1 });
      toast({
        title: t("welcome-back-toast"),
        description: t("You’re logged in and ready to go."),
      });
      const next = searchParam.get("next");

      if (next) {
        router.push(decodeURIComponent(next));
      } else {
        router.push("/overview");
      }
    }
  }
  return <LoginForm onSubmit={onSubmit} initialValues={initialValues} />;
}

export default LoginProvider;
