"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useTranslation } from "react-i18next";
import { ArrowDownUp } from "lucide-react";
import qs from "query-string";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { OptionType } from "./checkbox-filter";

interface PropTypes<V> {
  title: string;
  options: OptionType<V>[];
  queryKey: string;
}

export function Sort<V extends React.Key>({
  options,
  queryKey,
  title,
}: PropTypes<V>) {
  const search = useSearchParams();
  const stringifySearch = search.toString();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const parsedSearchParams = qs.parse(stringifySearch);
  let selectedValue: string | null = null;

  if (typeof parsedSearchParams[queryKey] === "string") {
    selectedValue = parsedSearchParams[queryKey];
  }

  function onClear() {
    const clonedParams = { ...parsedSearchParams };
    delete clonedParams[queryKey];
    const newUrl = qs.stringifyUrl({
      url: pathname,
      query: {
        ...clonedParams,
      },
    });

    router.push(newUrl);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={selectedValue ? "secondary" : "outline"}
          size="sm"
          className="ms-auto flex h-8"
        >
          <ArrowDownUp className="me-2 h-4 w-4" />
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuLabel>{t("product.sortBy")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((opt) => {
          const isSelected = opt.value == selectedValue;
          return (
            <DropdownMenuCheckboxItem
              key={opt.value}
              className="capitalize ps-2"
              onSelect={() => {
                let newValue: string | null = null;

                if (isSelected) {
                  onClear();
                  return;
                } else {
                  newValue = String(opt.value);
                }

                const clonedParams = { ...parsedSearchParams };
                delete clonedParams[queryKey];
                const newUrl = qs.stringifyUrl({
                  url: pathname,
                  query: {
                    [queryKey]: newValue,
                    ...clonedParams,
                  },
                });

                router.push(newUrl);
              }}
            >
              {opt.icon && (
                <opt.icon
                  weight={isSelected ? "fill" : "bold"}
                  className="me-2 h-4 w-4 text-muted-foreground"
                />
              )}
              {opt.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
