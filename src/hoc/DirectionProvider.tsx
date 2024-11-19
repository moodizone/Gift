"use client";
import * as React from "react";
import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";

type DirectionType = "rtl" | "ltr";
interface DirectionContextType {
  direction: DirectionType;
  toggleDirection(): void;
}

const DirectionContext = React.createContext<DirectionContextType>({
  direction: "rtl",
  toggleDirection() {
    return void 0;
  },
});
DirectionContext.displayName = "DirectionContext";

function DirectionProvider({ children }: React.PropsWithChildren) {
  const [direction, setDirection] = React.useState<DirectionType>("rtl");

  function toggleDirection() {
    const newDirection = direction === "rtl" ? "ltr" : "rtl";
    const html = document.querySelector("html");

    if (html) {
      html.setAttribute("dir", newDirection);
    }

    setDirection(newDirection);
  }

  return (
    <DirectionContext.Provider value={{ direction, toggleDirection }}>
      <RadixDirectionProvider dir={direction}>
        {children}
      </RadixDirectionProvider>
    </DirectionContext.Provider>
  );
}

function useDirection() {
  const context = React.useContext(DirectionContext);

  if (!context) {
    throw new Error(`"useDirection" must be used within "DirectionProvider"`);
  }
  return context;
}

export { useDirection, DirectionProvider };
