import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LimitEnum } from "@/services/type";
import { useTranslation } from "react-i18next";

interface PropsType {
  count: number;
  perPage: LimitEnum;
  pageNumber: number;
}

export function Pagination({ count, pageNumber, perPage }: PropsType) {
  // TODO:translation
  // discount
  // stock
  // no price products
  // broken image products (fallback image)
  const { t } = useTranslation();
  const lastPage = Math.ceil(count / perPage);
  const search = useSearchParams().toString();
  const pathname = usePathname();
  const router = useRouter();
  const parsedSearchParams = qs.parse(search);

  function updateURL(key: string, value: LimitEnum | number) {
    const clonedParams = { ...parsedSearchParams };
    delete clonedParams[key];
    const newUrl = qs.stringifyUrl({
      url: pathname,
      query: {
        ...clonedParams,
        [key]: value,
      },
    });
    router.push(newUrl);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-y-2 px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {t("pagination.count", { a: count })}
      </div>
      <div className="flex flex-col md:flex-row items-center gap-y-2 gap-x-6 lg:gap-x-8">
        <div className="flex items-center gap-x-2">
          <p className="text-sm font-medium">{t("pagination.title")}</p>
          <Select
            defaultValue={`${perPage}`}
            onValueChange={(v) => {
              updateURL("limit", +v);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[LimitEnum.few, LimitEnum.regular, LimitEnum.many].map(
                (pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          {t("pagination.pageOf", { a: pageNumber, b: lastPage })}
        </div>
        <div className="flex items-center gap-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              updateURL("page", 1);
            }}
            disabled={pageNumber === 1}
          >
            <span className="sr-only">{t("pagination.first")}</span>
            <DoubleArrowLeftIcon className="h-4 w-4 rtl:scale-x-[-1]" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageNumber === 1}
            onClick={() => {
              if (pageNumber > 1) {
                updateURL("page", pageNumber - 1);
              }
            }}
          >
            <span className="sr-only">{t("pagination.previous")}</span>
            <ChevronLeftIcon className="h-4 w-4 rtl:scale-x-[-1]" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageNumber === lastPage}
            onClick={() => {
              if (pageNumber < lastPage) {
                updateURL("page", pageNumber + 1);
              }
            }}
          >
            <span className="sr-only">{t("pagination.next")}</span>
            <ChevronRightIcon className="h-4 w-4 rtl:scale-x-[-1]" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={pageNumber === lastPage}
            onClick={() => {
              updateURL("page", lastPage);
            }}
          >
            <span className="sr-only">{t("pagination.last")}</span>
            <DoubleArrowRightIcon className="h-4 w-4 rtl:scale-x-[-1]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
