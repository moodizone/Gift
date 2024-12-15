import * as React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function ProductCard() {
  const filledCol = "var(--zinc-400-to-700)";
  const unfilledCol = "var(--zinc-700-to-400)";

  return (
    <a href="#" target="_blank" rel="noreferrer">
      <Card className="w-full sm:w-[320px]">
        <CardHeader className="relative w-full h-[300px] bg-zinc-200 dark:bg-zinc-900 flex items-center justify-center">
          <Badge className="absolute end-4 top-4 shadow-sm" variant="secondary">
            Secondary
          </Badge>
          <div className="relative w-full h-full max-h-[180px]">
            <Image
              src="https://m.media-amazon.com/images/I/71Sbx9zQN3L._AC_UY218_.jpg"
              fill
              className="object-contain "
              alt="mamad"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-2 mt-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="flex">
                  <Star size={16} fill={filledCol} strokeWidth={0} />
                  <Star size={16} fill={filledCol} strokeWidth={0} />
                  <Star size={16} fill={filledCol} strokeWidth={0} />
                  <Star size={16} fill={filledCol} strokeWidth={0} />
                  <Star size={16} fill={unfilledCol} strokeWidth={0} />
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  (22,345)
                </span>
              </div>
              <h2 className="text-md font-semibold self-start">$110.11</h2>
            </div>
            <h2
              className="text-md font-normal line-clamp-2"
              title="Decor Wooden Stool, a stylish, versatile piece with natural wood finish. Decor Wooden Stool, a stylish, versatile."
            >
              Decor Wooden Stool, a stylish, versatile piece with natural wood
              finish. Decor Wooden Stool, a stylish, versatile.
            </h2>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

export default ProductCard;
