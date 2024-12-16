import { clientFetch } from "@/lib/fetch";
import { GetProductResponse } from "./type";

export async function getProducts(qs: string) {
  return clientFetch<GetProductResponse>(
    `/product${Boolean(qs) ? `?${qs}` : ""}`
  );
}
