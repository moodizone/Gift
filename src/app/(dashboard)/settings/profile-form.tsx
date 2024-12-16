import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

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
import { ProfileFormValues } from "./ProfileProvider";

interface PropsType {
  initialValue: ProfileFormValues;
  onSubmit(data: ProfileFormValues): Promise<void>;
}

export function ProfileForm({ initialValue, onSubmit }: PropsType) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: initialValue,
    mode: "onChange",
  });
  async function submitHandler(data: ProfileFormValues) {
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("firstName")}</FormLabel>
              <FormControl>
                <Input
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  inputMode="text"
                  {...field}
                />
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
                <Input
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  inputMode="text"
                  {...field}
                />
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
                <Input
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  inputMode="tel"
                  {...field}
                />
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
                <Textarea
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  inputMode="text"
                  className="resize-none"
                  {...field}
                  maxLength={1000}
                />
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
                <Textarea
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  inputMode="text"
                  className="resize-none"
                  {...field}
                  maxLength={1000}
                />
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
  );
}
