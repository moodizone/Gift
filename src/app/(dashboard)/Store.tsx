"use client";
import * as React from "react";
import { UserMeResponse } from "@/services/type";
import { useUserSlice } from "@/store/user";
import Cookies from "js-cookie";

interface PropsType {
  me: UserMeResponse;
}

function Store({ me }: PropsType) {
  const { login } = useUserSlice();
  const token = Cookies.get("token") as string;

  React.useEffect(() => {
    login({ ...me, token });
  }, [login, me, token]);

  return null;
}

export default Store;
