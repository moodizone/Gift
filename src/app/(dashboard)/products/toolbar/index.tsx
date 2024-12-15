import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Dress,
  Palette,
  Info,
  Baby,
  Car,
  Laptop,
  Factory,
  Ghost,
  Heartbeat,
  PawPrint,
  TShirt,
  ThumbsUp,
  Trophy,
} from "@phosphor-icons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import i18n from "@/locale/client-config";
import { Input } from "@/components/ui/input";
import { Sort } from "./sort";
import { CheckboxFilter, OptionType } from "./checkbox-filter";
import { GetCategoryResponse } from "@/services/type";
import { RadioFilter } from "./radio-filter";

interface PropsType {
  categories: GetCategoryResponse[];
}

const sortOptions: OptionType<string>[] = [
  { value: "2", label: i18n.t("product.sort.2") }, // expensive
  { value: "1", label: i18n.t("product.sort.1") }, // cheap
  { value: "3", label: i18n.t("product.sort.3") }, // commented
  { value: "4", label: i18n.t("product.sort.4") }, // new
];
const rateOptions: OptionType<string>[] = [
  {
    label: i18n.t("rating.1"),
    value: "1", //[0:2]
    icon: Ghost,
  },
  {
    label: i18n.t("rating.2"),
    value: "2", // (2:4)
    icon: ThumbsUp,
  },
  {
    label: i18n.t("rating.3"),
    value: "3", // [4:5]
    icon: Trophy,
  },
];

function categoryIconMapper(id: number) {
  switch (id) {
    // art
    case 1:
      return Palette;
    // automotive
    case 2:
      return Car;
    // baby
    case 3:
      return Baby;
    // boys
    case 4:
      return TShirt;
    // computer
    case 5:
      return Laptop;
    // girls
    case 6:
      return Dress;
    // health
    case 7:
      return Heartbeat;
    // industrial and scientific
    case 8:
      return Factory;
    // pet supplies
    case 9:
      return PawPrint;
    // fallback
    default:
      return Info;
  }
}

export function Toolbar({ categories }: PropsType) {
  const { t } = useTranslation();
  const search = useSearchParams();
  const stringifySearch = search.toString();
  const pathname = usePathname();
  const router = useRouter();
  const parsedSearchParams = qs.parse(stringifySearch);
  const term = parsedSearchParams.term;
  const categoryOptions = categories.reduce<
    OptionType<GetCategoryResponse["id"]>[]
  >((prev, curr) => {
    // only display parent categories
    if (curr.superCategory === null) {
      prev.push({
        label: t(`category.${curr.id}`),
        value: curr.id,
        icon: categoryIconMapper(curr.id),
      });
    }

    return prev;
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2 justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          defaultValue={typeof term === "string" ? term : undefined}
          onChange={(e) => {
            const clonedParams = { ...parsedSearchParams };

            delete clonedParams.term;
            const newUrl = qs.stringifyUrl({
              url: pathname,
              query: {
                ...clonedParams,
                term: e.target.value ? e.target.value : undefined,
              },
            });
            router.push(newUrl);
          }}
          placeholder={t("product.searchPlaceholder")}
          className="h-8 w-[240px]"
        />
        <CheckboxFilter<GetCategoryResponse["id"]>
          title={t("product.category")}
          options={categoryOptions}
          queryKey="category"
        />
        <RadioFilter<string>
          title={t("product.rate")}
          options={rateOptions}
          queryKey="rate"
        />
      </div>
      <div className="self-start">
        <Sort<string>
          title={t("product.view")}
          options={sortOptions}
          queryKey="sort"
        />
      </div>
    </div>
  );
}
