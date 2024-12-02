import { create } from "zustand";

import { AuthLoginResponse, UserUpdateResponse } from "@/services/type";

interface UserState {
  isLoggedIn: boolean;
  loginData?: AuthLoginResponse;
  login(payload: AuthLoginResponse): void;
  update(payload: UserUpdateResponse): void;
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
  update(payload: UserUpdateResponse) {
    set((state) => {
      if (state.loginData?.token) {
        const newLoginDate: AuthLoginResponse = {
          ...payload,
          token: state.loginData.token,
        };
        return { loginData: newLoginDate };
      }
      return state;
    });
  },
}));
