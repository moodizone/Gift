import { initI18nInstance } from "@/locale/server-config";
import { basedMeta } from "@/lib/metadata";
import ProfileProvider from "./ProfileProvider";
import Layout from "../AuthProvider/layout";
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
    title: i18n.t("Settings"),
    description: i18n.t(
      "Manage and update your personal information on your profile page for a personalized experience."
    ),
    privateMode: true,
  });
}

export default async function ProfilePage() {
  const i18n = await initI18nInstance();
  return (
    <Layout>
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle>{i18n.t("Profile")}</CardTitle>
          <CardDescription>
            {i18n.t("This is how others will see you on the site.")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileProvider />
        </CardContent>
      </Card>
    </Layout>
  );
}
