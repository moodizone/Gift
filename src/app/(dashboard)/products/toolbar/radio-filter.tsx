import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
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
import { OptionType } from "./checkbox-filter";

interface PropTypes<V> {
  title: string;
  options: OptionType<V>[];
  queryKey: string;
}

export function RadioFilter<V extends React.Key>({
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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="me-2 h-4 w-4" />
          {title}
          {selectedValue ? (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValue.length}
              </Badge>
              <div className="hidden gap-x-1 lg:flex">
                {options
                  .filter((option) => selectedValue == option.value)
                  .map((option) => (
                    <Badge
                      variant="secondary"
                      key={option.value}
                      className="rounded-sm px-1 font-normal"
                    >
                      {option.label}
                    </Badge>
                  ))}
              </div>
            </>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>{t("No results found")}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = option.value == selectedValue;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      let newValue: string | null = null;

                      if (isSelected) {
                        onClear();
                        return;
                      } else {
                        newValue = String(option.value);
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
            {selectedValue ? (
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
