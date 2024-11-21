"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "react-use";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/SVGR";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { emailSchema, loginSchema } from "@/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { emailAvailability, register } from "@/services/auth";
import { APIError } from "@/lib/fetch";
import { useToast } from "@/hooks/use-toast";
import { toastError } from "@/lib/toasHandlers";

export default function LoginForm() {
  const router = useRouter();
  const emailId = React.useId();
  const passwordId = React.useId();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const email = form.watch("email");
  useDebounce(checkEmailAvailability, 1500, [email]);

  async function checkEmailAvailability() {
    const { success } = emailSchema.safeParse(email);

    // send the request if user enters valid email
    if (success) {
      try {
        const response = await emailAvailability({ email });

        if (response) {
          return form.clearErrors("email");
        }
      } catch (error) {
        if (error instanceof APIError && error.response.status === 409) {
          return form.setError("email", {
            type: "manual",
            message: "This email is not available",
          });
        }
      }
    }
  }
  async function onSubmit({ email, password }: z.infer<typeof loginSchema>) {
    setIsLoading(true);

    try {
      const response = await register({ email, password });
      if (response) {
        Cookies.set("token", response.token, { expires: 1 });
        toast({
          title: "Welcome",
          description: "Your journey starts now. ✨",
        });
        router.push("/overview");
      }
    } catch (error) {
      if (error instanceof APIError) {
        // display banner errors
        toastError(toast, error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6")}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-y-2"
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor={emailId}>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id={emailId}
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      className="digit"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor={passwordId}>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id={passwordId}
                      type="password"
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      disabled={isLoading}
                      className="digit"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="me-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="me-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="me-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
