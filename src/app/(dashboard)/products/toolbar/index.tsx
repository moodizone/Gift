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

import i18n from "@/locale/client-config";
import { Sort } from "./sort";
import { CheckboxFilter, OptionType } from "./checkbox-filter";
import {
  GetCategoryResponse,
  ProductRatingEnum,
  ProductSortEnum,
} from "@/services/type";
import { RadioFilter } from "./radio-filter";
import SearchInput from "./search-input";

interface PropsType {
  categories: GetCategoryResponse[];
}

const sortOptions: OptionType<string>[] = [
  {
    value: ProductSortEnum.cheap,
    label: i18n.t(`product.sort.${ProductSortEnum.cheap}`),
  },
  {
    value: ProductSortEnum.expensive,
    label: i18n.t(`product.sort.${ProductSortEnum.expensive}`),
  },
  {
    value: ProductSortEnum.commented,
    label: i18n.t(`product.sort.${ProductSortEnum.commented}`),
  },
  {
    value: ProductSortEnum.new,
    label: i18n.t(`product.sort.${ProductSortEnum.new}`),
  },
];
const rateOptions: OptionType<string>[] = [
  {
    label: i18n.t(`rating.${ProductRatingEnum.low}`),
    value: ProductRatingEnum.low,
    icon: Ghost,
  },
  {
    label: i18n.t(`rating.${ProductRatingEnum.medium}`),
    value: ProductRatingEnum.medium,
    icon: ThumbsUp,
  },
  {
    label: i18n.t(`rating.${ProductRatingEnum.high}`),
    value: ProductRatingEnum.high,
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
        <SearchInput />
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
