import { clientFetch } from "@/lib/fetch";
import {
  AuthEmailAvailabilityBody,
  AuthLoginResponse,
  AuthRegisterBody,
} from "./type";

export async function emailAvailability({ email }: AuthEmailAvailabilityBody) {
  return clientFetch<object>("/auth/email-availability", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
export async function register({ email, password }: AuthRegisterBody) {
  return clientFetch<AuthLoginResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
