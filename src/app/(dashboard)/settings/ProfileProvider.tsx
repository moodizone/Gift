"use client";
import { z } from "zod";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { updateUserSchema } from "@/validation";
import { useUserSlice } from "@/store/user";
import { ProfileForm } from "./profile-form";
import { updateUserProfile } from "@/services/user";
import { toast } from "@/hooks/use-toast";
import { APIError } from "@/lib/fetch";
import { toastError } from "@/lib/toasHandlers";

export type ProfileFormValues = z.infer<typeof updateUserSchema>;

const defaultValues: ProfileFormValues = {
  firstName: "",
  lastName: "",
  tel: "",
  gender: undefined,
  birthday: "",
  address: "",
  bio: "",
};

function ProfileProvider() {
  const { t } = useTranslation();
  const { loginData, update } = useUserSlice();

  async function onSubmit(data: ProfileFormValues) {
    if (loginData?.id) {
      try {
        const response = await updateUserProfile(loginData?.id, data);
        update(response);
        toast({
          title: t("Success"),
          description: t("Changes saved. You're all set"),
        });
      } catch (error) {
        if (error instanceof APIError) {
          // display banner errors
          toastError(toast, error);
        }
      }
    }
  }

  // wait for zustand to hydrate then load the form
  // because `defaultValue` for some of form elements
  // won't happen after zustand's hydration
  if (!loginData) {
    return null;
  }

  const initialValue: ProfileFormValues = {
    firstName: loginData.firstName ?? defaultValues.firstName,
    lastName: loginData.lastName ?? defaultValues.lastName,
    gender: loginData.gender ?? undefined,
    tel: loginData.tel ?? defaultValues.tel,
    birthday: loginData.birthday ?? defaultValues.birthday,
    address: loginData.address ?? defaultValues.address,
    bio: loginData.bio ?? defaultValues.bio,
  };

  return <ProfileForm onSubmit={onSubmit} initialValue={initialValue} />;
}

export default ProfileProvider;
