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
import List from "./list";

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
        <CardContent
          className="grid gap-4 justify-center sm:justify-start 
        grid-cols-[repeat(auto-fit,_minmax(320px,1fr))] sm:grid-cols-[repeat(auto-fit,320px)]"
        >
          <List />
        </CardContent>
      </Card>
    </Layout>
  );
}
