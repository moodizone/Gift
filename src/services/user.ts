import { clientFetch } from "@/lib/fetch";
import {
  UserUpdateBody,
  UserUpdatePasswordBody,
  UserUpdatePasswordResponse,
  UserUpdateResponse,
} from "./type";

export async function updateUserProfile(id: number, payload: UserUpdateBody) {
  return clientFetch<UserUpdateResponse>(`/user/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
export async function updateUserPassword(
  id: number,
  payload: UserUpdatePasswordBody
) {
  return clientFetch<UserUpdatePasswordResponse>(`/user/password/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
