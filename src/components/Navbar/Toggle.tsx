"use client";
import * as React from "react";

function Toggle() {
  return (
    <button
      onClick={() => {
        const html = document.querySelector("html");

        if (html) {
          const dir = html.getAttribute("dir");

          html.setAttribute("dir", dir === "rtl" ? "ltr" : "rtl");
        }
      }}
    >
      T
    </button>
  );
}

export default Toggle;
