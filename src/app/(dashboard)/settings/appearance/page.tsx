import { AppearanceForm } from "./appearance-form";
import { initI18nInstance } from "@/locale/server-config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { basedMeta } from "@/lib/metadata";
import Layout from "../../AuthProvider/layout";

// since server components need to be rerendered in server with new language
export const revalidate = 0;

export async function generateMetadata() {
  const i18n = await initI18nInstance();
  return basedMeta({
    title: i18n.t("Appearance"),
    description: i18n.t(
      "Customize the appearance of the app. Automatically switch between day and night themes."
    ),
    privateMode: true,
  });
}

export default async function AppearancePage() {
  const i18n = await initI18nInstance();

  return (
    <Layout>
      <Card className="border-0">
        <CardHeader>
          <CardTitle>{i18n.t("Appearance")}</CardTitle>
          <CardDescription>
            {i18n.t(
              "Customize the appearance of the app. Automatically switch between day and night themes."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AppearanceForm />
        </CardContent>
      </Card>
    </Layout>
  );
}
