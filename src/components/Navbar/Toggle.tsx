"use client";
import { useDirection } from "@/hoc/DirectionProvider";
import * as React from "react";

function Toggle() {
  const { toggleDirection } = useDirection();
  return <button onClick={toggleDirection}>T</button>;
}

export default Toggle;
