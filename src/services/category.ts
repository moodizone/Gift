import { clientFetch } from "@/lib/fetch";
import { GetCategoryResponse } from "./type";

export async function getCategory() {
  return clientFetch<GetCategoryResponse[]>("/category");
}
