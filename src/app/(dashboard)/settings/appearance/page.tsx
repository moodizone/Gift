import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "./appearance-form";
import { Metadata } from "next";
import { initI18nInstance } from "@/locale/server-config";

// since server components need to be rerendered in server with new language
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Appearance",
};

export default async function SettingsAppearancePage() {
  const i18n = await initI18nInstance();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{i18n.t("Appearance")}</h3>
        <p className="text-sm text-muted-foreground">
          {i18n.t(
            "Customize the appearance of the app. Automatically switch between day and night themes."
          )}
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
