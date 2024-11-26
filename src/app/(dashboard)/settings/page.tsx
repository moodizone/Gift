import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import { initI18nInstance } from "@/locale/server-config";

export const metadata: Metadata = {
  title: "Settings",
};

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
