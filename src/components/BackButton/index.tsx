"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Button } from "../ui/button";

function BackButton() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Button variant={"ghost"} className={"w-[180px]"} onClick={router.back}>
      {t("Back")}
    </Button>
  );
}

export default BackButton;
