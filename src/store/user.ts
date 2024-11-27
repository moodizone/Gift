import { create } from "zustand";

import { AuthLoginResponse } from "@/services/type";

interface UserState {
  isLoggedIn: boolean;
  loginData?: AuthLoginResponse;
  login(payload: AuthLoginResponse): void;
  logout(): void;
}

export const useUserSlice = create<UserState>()((set) => ({
  isLoggedIn: false,
  login(payload) {
    set(() => ({ loginData: payload, isLoggedIn: true }));
  },
  logout() {
    set(() => ({ loginData: undefined, isLoggedIn: false }));
  },
}));