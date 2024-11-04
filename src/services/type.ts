export interface CategoryType {
  id: string;
  title: string;
}
export interface ShopperType {
  id: string;
  tel: string;
  name?: string;
}
export interface ProjectType {
  id: string;
  title: string;
  burnLimit: number;
  shoppers: Array<ShopperType["id"]>;
  creationDate: string;
  expire?: string;
}
export interface ProductType {
  id: string;
  title: string;
  description?: string;
  image?: string;
  price?: number;
}
export interface Order {
  id: string;
  userId: ShopperType["id"];
  projectId: ProjectType["id"];
  productIds: ProductType["id"];
}
export interface AccountDetailsType {
  id: string;
  name?: string;
  tel: string;
  avatar?: string;
}
