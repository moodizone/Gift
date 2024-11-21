import { clientFetch } from "@/lib/fetch";
import {
  AuthEmailAvailabilityBody,
  UserCreateBody,
  UserCreateResponse,
} from "./type";

export async function emailAvailability({ email }: AuthEmailAvailabilityBody) {
  return clientFetch<object>("/auth/email-availability", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
export async function register({ email, password }: UserCreateBody) {
  return clientFetch<UserCreateResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
