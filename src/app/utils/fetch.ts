export async function clientFetch(url: string, options?: RequestInit) {
  try {
    const newHeaders = new Headers(options?.headers || {});
    newHeaders.set("Content-Type", "application/json");
    const newOptions = {
      ...options,
      headers: newHeaders,
    };
    const baseURL = "http://localhost:3000/api";
    const response = await fetch(baseURL + url, newOptions);
    return response;
  } catch (error) {
    console.error(`🚫 API Error:\n`, error);
  }
}
