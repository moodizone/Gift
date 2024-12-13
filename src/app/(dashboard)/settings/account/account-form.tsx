import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

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
import { AccountFormValues } from "./AccountProvider";
import { userPasswordSchema } from "@/validation";

interface PropsType {
  initialValue: AccountFormValues;
  onSubmit(data: AccountFormValues): Promise<void>;
}

export function AccountForm({ initialValue, onSubmit }: PropsType) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState({
    old: false,
    new: false,
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(userPasswordSchema),
    defaultValues: initialValue,
    mode: "onChange",
  });
  async function submitHandler(data: AccountFormValues) {
    setIsLoading(true);
    onSubmit(data).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8 max-w-[600px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Email")}</FormLabel>
              <FormControl>
                <Input
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  inputMode="email"
                  className="digit"
                  type="email"
                  readOnly
                  {...field}
                />
              </FormControl>
              <FormDescription>{t("emailH")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("oldPassword")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    className="pe-8"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    inputMode="text"
                    type={showPassword.old ? "text" : "password"}
                  />
                  <div className="absolute inset-y-0 end-0 pe-3 flex items-center text-gray-400 cursor-pointer">
                    {showPassword.old ? (
                      <EyeOff
                        className="h-4 w-4"
                        onClick={() => {
                          setShowPassword((prev) => ({
                            ...prev,
                            old: !prev.old,
                          }));
                        }}
                      />
                    ) : (
                      <Eye
                        className="h-4 w-4"
                        onClick={() => {
                          setShowPassword((prev) => ({
                            ...prev,
                            old: !prev.old,
                          }));
                        }}
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormDescription>{t("oldPasswordH")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("newPassword")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    className="pe-8"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    inputMode="text"
                    type={showPassword.new ? "text" : "password"}
                  />
                  <div className="absolute inset-y-0 end-0 pe-3 flex items-center text-gray-400 cursor-pointer">
                    {showPassword.new ? (
                      <EyeOff
                        className="h-4 w-4"
                        onClick={() => {
                          setShowPassword((prev) => ({
                            ...prev,
                            new: !prev.new,
                          }));
                        }}
                      />
                    ) : (
                      <Eye
                        className="h-4 w-4"
                        onClick={() => {
                          setShowPassword((prev) => ({
                            ...prev,
                            new: !prev.new,
                          }));
                        }}
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormDescription>{t("newPasswordH")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isDirty || isLoading} type="submit">
          {t("Update Password")}
        </Button>
      </form>
    </Form>
  );
}
