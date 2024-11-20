import { clientFetch } from "@/app/utils/fetch";
import { AuthEmailAvailabilityBody } from "./type";

export async function emailAvailability({ email }: AuthEmailAvailabilityBody) {
  return clientFetch("/auth/email-availability", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
