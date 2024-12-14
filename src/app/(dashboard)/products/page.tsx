import { initI18nInstance } from "@/locale/server-config";
import Layout from "../AuthProvider/layout";
import { basedMeta } from "@/lib/metadata";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductCard from "./product-card";
import { Toolbar } from "./toolbar";
import { Pagination } from "./toolbar/pagination";

export async function generateMetadata() {
  const i18n = await initI18nInstance();
  return basedMeta({
    title: i18n.t("Products"),
    description: i18n.t("ProductsH"),
    privateMode: true,
  });
}

export default async function Page() {
  const i18n = await initI18nInstance();
  return (
    <Layout>
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle>{i18n.t("Products")}</CardTitle>
          <CardDescription>{i18n.t("ProductsH")}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 justify-center sm:justify-start grid-cols-[repeat(auto-fit,320px)]">
          <div className="col-span-full">
            <Toolbar />
          </div>
          {new Array(20).fill(1).map((_, index) => (
            <ProductCard key={index} />
          ))}
          <div className="col-span-full">
            <Pagination />
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
