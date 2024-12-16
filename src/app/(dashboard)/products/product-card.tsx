import * as React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/services/type";
import { Star, StarHalf } from "@phosphor-icons/react";

function ProductCard({
  title,
  alt,
  thumbnail,
  price,
  categoryId,
  rateCount,
  rating,
  sourceLink,
}: ProductType) {
  const { t } = useTranslation();
  const filledCol = "var(--zinc-400-to-700)";

  return (
    <a href={sourceLink ? sourceLink : "#"} target="_blank" rel="noreferrer">
      <Card className="w-full sm:w-[320px]">
        <CardHeader className="relative w-full h-[300px] bg-zinc-200 dark:bg-zinc-900 flex items-center justify-center">
          {categoryId ? (
            <Badge
              className="absolute end-4 top-4 shadow-sm"
              variant="secondary"
            >
              {t(`category.${categoryId}`)}
            </Badge>
          ) : null}
          {alt && thumbnail ? (
            <div className="relative w-full h-full max-h-[180px]">
              <Image
                src={thumbnail}
                fill
                className="object-contain "
                alt={alt}
              />
            </div>
          ) : null}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-2 mt-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                {rating ? (
                  <div className="flex">
                    {new Array(Math.floor(rating))
                      .fill(null)
                      .map((_, index) => (
                        <Star
                          size={16}
                          fill={filledCol}
                          weight="fill"
                          key={index}
                        />
                      ))}
                    <StarHalf
                      size={16}
                      fill={filledCol}
                      weight="fill"
                      className="rtl:scale-x-[-1]"
                    />
                  </div>
                ) : null}
                {rateCount ? (
                  <span className="text-xs text-muted-foreground mt-1">
                    {`(${rateCount})`}
                  </span>
                ) : null}
              </div>
              <h2 className="text-md font-semibold self-start">${price}</h2>
            </div>
            <h2
              className="text-md font-normal line-clamp-2"
              title="Decor Wooden Stool, a stylish, versatile piece with natural wood finish. Decor Wooden Stool, a stylish, versatile."
            >
              {title}
            </h2>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

export default ProductCard;
