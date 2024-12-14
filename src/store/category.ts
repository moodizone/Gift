import { create } from "zustand";

import { getCategory as getCategoryService } from "@/services/category";
import { GetCategoryResponse } from "@/services/type";

interface CategoryState {
  list: GetCategoryResponse[];
  isFetched: boolean;
  getCategories(): Promise<GetCategoryResponse[]>;
}

export const useCategorySlice = create<CategoryState>()((set, getState) => ({
  isFetched: false,
  list: [],
  async getCategories() {
    const currentState = getState();

    if (currentState.isFetched) return Promise.resolve(currentState.list);

    const result = await getCategoryService();
    set(() => ({ list: result, isFetched: true }));
    return result;
  },
}));
