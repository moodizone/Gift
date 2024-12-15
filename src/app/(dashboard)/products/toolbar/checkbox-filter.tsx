import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export interface OptionType<V> {
  label: string;
  value: V;
  icon?: Icon;
}

interface PropTypes<V> {
  title: string;
  options: OptionType<V>[];
  queryKey: string;
}

export function CheckboxFilter<V extends React.Key>({
  title,
  options,
  queryKey,
}: PropTypes<V>) {
  // I have to use it over `window.location.search` since this
  // hook make rerender if query parameter changes
  const search = useSearchParams();
  const stringifySearch = search.toString();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const parsedSearchParams = qs.parse(stringifySearch);
  let selectedValues: string[] = [];

  if (typeof parsedSearchParams[queryKey] === "string") {
    selectedValues = [parsedSearchParams[queryKey]];
  } else if (Array.isArray(parsedSearchParams[queryKey])) {
    selectedValues = parsedSearchParams[queryKey].filter(
      (c) => typeof c === "string"
    );
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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="me-2 h-4 w-4" />
          {title}
          {selectedValues?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden gap-x-1 lg:flex">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {t("product.selectedFilter", {
                      count: selectedValues.length,
                    })}
                  </Badge>
                ) : (
                  options
                    .filter((option) => {
                      const foundedIndex = selectedValues.findIndex(
                        (v) => v == option.value
                      );
                      return foundedIndex !== -1;
                    })
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={t("Find your perfect match ...")} />
          <CommandList>
            <CommandEmpty>{t("No results found")}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const foundedIndex = selectedValues.findIndex(
                  (v) => v == option.value
                );
                const isSelected = foundedIndex !== -1;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      let newValues: string[] = [];

                      if (isSelected) {
                        newValues = selectedValues.filter(
                          (v) => v != option.value
                        );
                      } else {
                        newValues = [...selectedValues, String(option.value)];
                      }

                      const clonedParams = { ...parsedSearchParams };
                      delete clonedParams[queryKey];
                      const newUrl = qs.stringifyUrl({
                        url: pathname,
                        query: {
                          [queryKey]: newValues,
                          ...clonedParams,
                        },
                      });

                      router.push(newUrl);
                    }}
                  >
                    <div
                      className={cn(
                        "me-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon
                        weight={isSelected ? "fill" : "bold"}
                        className="me-2 h-4 w-4 text-muted-foreground"
                      />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.length > 0 ? (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={onClear}
                  >
                    {t("Clear Filters")}
                  </CommandItem>
                </CommandGroup>
              </>
            ) : null}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
