import { toast } from "@/hooks/use-toast";
import { APIError } from "./fetch";
import { ErrorType } from "@/services/type";

export async function toastError(ins: typeof toast, error: APIError) {
  // display banner errors
  const errors: ErrorType = await error.response.json();
  const description = (
    <code dir="ltr" className="whitespace-pre-wrap">
      {JSON.stringify(errors.message, null, 2)}
    </code>
  );

  ins({
    variant: "destructive",
    title: error.response.statusText,
    description,
  });
}
