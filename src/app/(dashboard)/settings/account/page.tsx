import { Separator } from "@/components/ui/separator";
import AccountProvider from "./AccountProvider";
import { initI18nInstance } from "@/locale/server-config";
import { basedMeta } from "@/lib/metadata";

export async function generateMetadata() {
  const i18n = await initI18nInstance();
  return basedMeta({
    title: i18n.t("Account Settings"),
    description: i18n.t("Account SettingsH"),
    privateMode: true,
  });
}

export default async function SettingsAccountPage() {
  const i18n = await initI18nInstance();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{i18n.t("Account Settings")}</h3>
        <p className="text-sm text-muted-foreground">
          {i18n.t("Account SettingsH")}
        </p>
      </div>
      <Separator />
      <AccountProvider />
    </div>
  );
}
