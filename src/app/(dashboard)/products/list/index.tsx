"use client";
import * as React from "react";
import { useAsync } from "react-use";
import { useSearchParams } from "next/navigation";

import { Toolbar } from "../toolbar";
import ProductCard from "../product-card";
import { Pagination } from "../toolbar/pagination";
import LoadingComponent from "./loading";
import NotFound from "./not-found";
import { useCategorySlice } from "@/store/category";
import { getProducts } from "@/services/product";
import { APIError } from "@/lib/fetch";
import { useToast } from "@/hooks/use-toast";
import { toastError } from "@/lib/toasHandlers";

function List() {
  //================================
  // Init
  //================================
  const { toast } = useToast();
  const search = useSearchParams().toString();
  const { getCategories } = useCategorySlice();
  const { loading: productLoading, value: productList = [] } =
    useAsync(async () => {
      try {
        const result = await getProducts(search);
        return result.list;
      } catch (error) {
        if (error instanceof APIError) {
          toastError(toast, error);
        }
      }
    }, [search]);
  const { value: categories = [], loading: categoryLoading } =
    useAsync(async () => {
      try {
        return getCategories();
      } catch (error) {
        if (error instanceof APIError) {
          toastError(toast, error);
        }
      }
      return getCategories();
    }, [getCategories]);

  //================================
  // Subcomponents
  //================================
  const products =
    productList.length === 0 ? (
      <NotFound />
    ) : (
      productList.map((details, index) => (
        <ProductCard {...details} key={index} />
      ))
    );
  const loading = categoryLoading || productLoading;

  //================================
  // Render
  //================================
  return loading ? (
    <LoadingComponent />
  ) : (
    <React.Fragment>
      <div className="col-span-full">
        <Toolbar categories={categories} />
      </div>
      {products}
      {productList.length > 0 ? (
        <div className="col-span-full">
          <Pagination />
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default List;
