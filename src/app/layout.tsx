import "./globals.scss";
import { cookies } from "next/headers";

import { DirectionProvider } from "@/hoc/DirectionProvider";
import ErrorBoundaryProvider from "@/hoc/ErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import { I18nextProvider } from "@/locale/client-config";
import { getI18nInstance } from "@/locale/server-config";
import { getDirection, getLanguage, getTheme } from "@/lib/settings";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cks = await cookies();
  const theme = getTheme(cks.get("theme")?.value);
  const lang = getLanguage(cks.get("language")?.value);
  const dir = getDirection(lang);
  const i18n = await getI18nInstance();
  await i18n.changeLanguage(lang);

  return (
    <html className={theme} lang={lang} dir={dir}>
      <body>
        <DirectionProvider>
          <I18nextProvider>
            <ErrorBoundaryProvider>
              <Toaster />
              {children}
            </ErrorBoundaryProvider>
          </I18nextProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
