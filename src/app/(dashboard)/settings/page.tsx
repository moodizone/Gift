import { Separator } from "@/components/ui/separator";
import { initI18nInstance } from "@/locale/server-config";
import { basedMeta } from "@/lib/metadata";
import { ProfileForm } from "./profile-form";

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

export default async function SettingsProfilePage() {
  const i18n = await initI18nInstance();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{i18n.t("Profile")}</h3>
        <p className="text-sm text-muted-foreground">
          {i18n.t("This is how others will see you on the site.")}
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
