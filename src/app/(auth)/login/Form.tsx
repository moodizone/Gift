"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/SVGR";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/services/auth";
import { APIError } from "@/lib/fetch";
import { useToast } from "@/hooks/use-toast";

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

  async function onSubmit({ email, password }: z.infer<typeof loginSchema>) {
    setIsLoading(true);

    try {
      const response = await login({ email, password });
      if (response) {
        Cookies.set("token", response.token, { expires: 1 });
        toast({
          title: "Welcome Back!👋",
          description: "You’re logged in and ready to go.",
        });
        router.push("/overview");
      }
    } catch (error) {
      if (error instanceof APIError) {
        return form.setError("email", {
          type: "manual",
          message: "Invalid email or password. Please try again.",
        });
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
            {"Enter"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
