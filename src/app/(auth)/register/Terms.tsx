"use client";
import Link from "next/link";
import * as React from "react";
import { Trans } from "react-i18next";

function Terms() {
  return (
    <p className="px-8 text-center text-sm text-muted-foreground">
      <Trans
        components={{
          a: (
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            />
          ),
          b: (
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            />
          ),
        }}
        i18nKey={
          "By clicking continue, you agree to our Terms of Service and Privacy Policy."
        }
      />
    </p>
  );
}

export default Terms;
