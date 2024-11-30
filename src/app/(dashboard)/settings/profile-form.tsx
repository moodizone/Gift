"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateUserSchema } from "@/validation";
import { useUserSlice } from "@/store/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gender } from "@/services/type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { updateUserProfile } from "@/services/user";
import { APIError } from "@/lib/fetch";
import { toastError } from "@/lib/toasHandlers";

type ProfileFormValues = z.infer<typeof updateUserSchema>;

const defaultValues = {
  firstName: "",
  lastName: "",
  tel: "",
  birthday: "",
  address: "",
  bio: "",
};

export function ProfileForm() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { update, loginData } = useUserSlice();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    if (loginData?.id) {
      setIsLoading(true);

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
      } finally {
        setIsLoading(false);
      }
    }
  }

  React.useEffect(() => {
    if (loginData) {
      form.reset({
        firstName: loginData.firstName ?? defaultValues.firstName,
        lastName: loginData.lastName ?? defaultValues.lastName,
        gender: loginData.gender ?? undefined,
        tel: loginData.tel ?? defaultValues.tel,
        birthday: loginData.birthday ?? defaultValues.birthday,
        address: loginData.address ?? defaultValues.address,
        bio: loginData.bio ?? defaultValues.bio,
      });
    }
  }, [form, loginData]);

  return loginData ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("firstName")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{t("firstNameH")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("lastName")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{t("lastNameH")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("birthday")}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] ps-3 rtl:text-right text-left font-normal"
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : null}
                      <CalendarIcon className="ms-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    captionLayout="dropdown"
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(e) => {
                      if (e) {
                        field.onChange(e.toISOString());
                      }
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>{t("birthdayH")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={loginData.gender ?? undefined}
          name="gender"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("gender")}</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl className="w-[240px]">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={gender.male}>{t("male")}</SelectItem>
                      <SelectItem value={gender.female}>
                        {t("female")}
                      </SelectItem>
                      <SelectItem value={gender.others}>
                        {t("others")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>{t("genderH")}</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="tel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("tel")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{t("telH")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("bio")}</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} maxLength={1000} />
              </FormControl>
              <FormDescription>{t("bioH")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("address")}</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} maxLength={1000} />
              </FormControl>
              <FormDescription>{t("addressH")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isDirty || isLoading} type="submit">
          {t("Update profile")}
        </Button>
      </form>
    </Form>
  ) : null;
}
