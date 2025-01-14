import AccountProvider from "./AccountProvider";
import { initI18nInstance } from "@/locale/server-config";
import { basedMeta } from "@/lib/metadata";
import Layout from "../../AuthProvider/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function generateMetadata() {
  const i18n = await initI18nInstance();
  return basedMeta({
    title: i18n.t("Account"),
    description: i18n.t("AccountH"),
    privateMode: true,
  });
}

export default async function AccountPage() {
  const i18n = await initI18nInstance();
  return (
    <Layout>
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle>{i18n.t("Account")}</CardTitle>
          <CardDescription>{i18n.t("AccountH")}</CardDescription>
        </CardHeader>
        <CardContent>
          <AccountProvider />
        </CardContent>
      </Card>
    </Layout>
  );
}
