export async function sleep(duration = 1500) {
  return new Promise((res) => setTimeout(res, duration));
}
export function isServer() {
  return typeof window === "undefined";
}
