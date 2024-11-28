import { clientFetch } from "@/lib/fetch";
import { UserUpdateBody, UserUpdateResponse } from "./type";

export async function updateUserProfile(id: number, payload: UserUpdateBody) {
  return clientFetch<UserUpdateResponse>(`/user/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
