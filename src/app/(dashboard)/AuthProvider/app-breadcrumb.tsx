"use client";
import * as React from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function AppBreadCrumb() {
  const pathname = usePathname();
  const segments = pathname.match(/\/[^\/]+/g);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments?.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const CP = isLast ? BreadcrumbPage : BreadcrumbLink;

          return (
            <React.Fragment key={segment}>
              <BreadcrumbItem className="hidden md:block">
                <CP href={segment} className="capitalize">
                  {segment.replace("/", "")}
                </CP>
              </BreadcrumbItem>
              {isLast ? null : (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default AppBreadCrumb;
