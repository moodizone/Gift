"use client";
import * as React from "react";
import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";
import { DirectionEnum, fallbackDirection, getDirection } from "@/lib/settings";

type DirectionType = "rtl" | "ltr";
interface DirectionContextType {
  direction: DirectionType;
}

const DirectionContext = React.createContext<DirectionContextType>({
  direction: "rtl",
});
DirectionContext.displayName = "DirectionContext";

export function DirectionProvider({ children }: React.PropsWithChildren) {
  const [dir, setDir] = React.useState<DirectionEnum>(fallbackDirection);

  React.useEffect(() => {
    const html = document.querySelector("html");

    if (html) {
      const lang = html.getAttribute("lang");
      const dir = getDirection(lang);

      setDir(dir);
    }
  }, []);

  return <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>;
}
