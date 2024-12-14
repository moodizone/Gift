"use client";

import { Apple } from "lucide-react";
import { Cross2Icon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sort } from "./sort";
import { Filters } from "./filters";

export function Toolbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter tasks..."
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Filters
          title="Status"
          options={[
            {
              value: "backlog",
              label: "Backlog",
              icon: QuestionMarkCircledIcon,
            },
            {
              value: "todo",
              label: "Todo",
              icon: Apple,
            },
          ]}
        />
        <Filters
          title="Priority"
          options={[
            {
              value: "backlog",
              label: "Backlog",
              icon: QuestionMarkCircledIcon,
            },
            {
              value: "todo",
              label: "Todo",
              icon: Apple,
            },
          ]}
        />
        <Button variant="ghost" className="h-8 px-2 lg:px-3">
          Reset
          <Cross2Icon className="ms-2 h-4 w-4" />
        </Button>
      </div>
      <Sort />
    </div>
  );
}
