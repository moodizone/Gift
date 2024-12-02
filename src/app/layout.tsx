import "./globals.scss";
import { cookies } from "next/headers";

import { DirectionProvider } from "@/hoc/DirectionProvider";
import ErrorBoundaryProvider from "@/hoc/ErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import { I18nextProvider } from "@/locale/client-config";
import { initI18nInstance } from "@/locale/server-config";
import { getDirection, getTheme } from "@/lib/settings";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cks = await cookies();
  const theme = getTheme(cks.get("theme")?.value);
  const i18n = await initI18nInstance();
  const dir = getDirection(i18n.language);

  return (
    <html className={theme} lang={i18n.language} dir={dir}>
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
