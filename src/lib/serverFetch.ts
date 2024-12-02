import { cookies } from "next/headers";
import { APIError } from "./fetch";

export async function serverFetch<T = unknown>(
  url: string,
  options?: RequestInit
) {
  const newHeaders = new Headers(options?.headers || {});
  newHeaders.set("Content-Type", "application/json");

  // append token
  const cks = await cookies();
  const token = cks.get("token")?.value;

  if (token) {
    newHeaders.set("Authorization", `Bearer: ${token}`);
  }

  const newOptions = {
    ...options,
    headers: newHeaders,
  };

  const response = await fetch(
    process.env.NEXT_PUBLIC_DOMAIN + "/api" + url,
    newOptions
  );

  if (response.ok) {
    const result = await response.clone().json();
    return result as T;
  } else {
    throw new APIError(response);
  }
}
