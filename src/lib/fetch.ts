export class APIError extends Error {
  response: Response;

  constructor(r: Response) {
    super(r.statusText);
    this.response = r;
  }
}

export async function clientFetch<T = unknown>(
  url: string,
  options?: RequestInit
) {
  const newHeaders = new Headers(options?.headers || {});
  newHeaders.set("Content-Type", "application/json");
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
