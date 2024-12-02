import { clientFetch } from "@/lib/fetch";
import {
  AuthEmailAvailabilityBody,
  AuthLoginBody,
  AuthLoginResponse,
  AuthRegisterBody,
  AuthRegisterResponse,
} from "./type";

export async function emailAvailability({ email }: AuthEmailAvailabilityBody) {
  return clientFetch<object>("/auth/email-availability", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
export async function register({ email, password }: AuthRegisterBody) {
  return clientFetch<AuthRegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
export async function login({ email, password }: AuthLoginBody) {
  return clientFetch<AuthLoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
