import Link from "next/link";
import { Trans } from "react-i18next";

import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/services/type";
import { APIError } from "@/lib/fetch";

export async function toastError(
  ins: typeof toast,
  error: APIError,
  skipUnauthorized: boolean = false
) {
  const { pathname, search } = window.location;
  const encoded = encodeURIComponent(pathname + search);
  // unauthorized error
  if (error.response.status === 401 && !skipUnauthorized) {
    ins({
      title: "Unauthorized Access 🔒",
      description: (
        <Trans
          components={{
            a: (
              <Link
                className="underline underline-offset-4 hover:text-primary"
                href={`/login?next=${encoded}`}
              />
            ),
          }}
          i18nKey={"Your session has expired"}
        />
      ),
    });
    return;
  }

  // rest of api errors
  const errors: ErrorType = await error.response.json();
  const description = (
    <pre className="mt-2 rounded-md p-1 bg-red-950">
      <code dir="ltr" className="text-white whitespace-pre-wrap">
        {JSON.stringify(errors.message, null, 1)}
      </code>
    </pre>
  );

  ins({
    variant: "destructive",
    title: error.response.statusText,
    description,
  });
}
