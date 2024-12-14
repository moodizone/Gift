import Image from "next/image";
import * as React from "react";
import { Star } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function Placeholder() {
  return (
    <Card className="w-[320px]">
      <CardHeader className="p-0">
        <Skeleton className="relative w-full h-[300px] bg-zinc-200 dark:bg-zinc-900 flex items-center justify-center" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-2 mt-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[240px]" />
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 w-[240px]" />
            <Skeleton className="h-4 w-[120px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Loading() {
  return new Array(4).fill(1).map((_, index) => <Placeholder key={index} />);
}

export default Loading;
