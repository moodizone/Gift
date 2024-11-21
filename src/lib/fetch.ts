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
  try {
    const newHeaders = new Headers(options?.headers || {});
    newHeaders.set("Content-Type", "application/json");
    const newOptions = {
      ...options,
      headers: newHeaders,
    };
    const base = "http://localhost:3000/api";
    const response = await fetch(base + url, newOptions);

    if (response.ok) {
      const result = await response.clone().json();
      return result as T;
    } else {
      throw new APIError(response);
    }
  } catch (error) {
    console.error(`🚫 Default client fetch error:\n`, error);
  }
}
