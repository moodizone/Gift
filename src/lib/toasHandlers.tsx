import { toast } from "@/hooks/use-toast";
import Link from "next/link";

import { APIError } from "./fetch";
import { ErrorType } from "@/services/type";

export async function toastError(ins: typeof toast, error: APIError) {
  // unauthorized error
  if (error.response.status === 401) {
    ins({
      title: "Unauthorized Access 🔒",
      description: (
        <p>
          Your session has expired. Please{" "}
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/login"
          >
            log in
          </Link>{" "}
          to continue.
        </p>
      ),
    });
    return;
  }

  // rest of api errors
  const errors: ErrorType = await error.response.json();
  const description = (
    <pre className="mt-2 rounded-md p-4">
      <code dir="ltr" className="text-white">
        {JSON.stringify(errors.message, null, 2)}
      </code>
    </pre>
  );

  ins({
    variant: "destructive",
    title: error.response.statusText,
    description,
  });
}
