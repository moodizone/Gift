import "./globals.scss";

import { DirectionProvider } from "@/hoc/DirectionProvider";
import ErrorBoundaryProvider from "@/hoc/ErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import { I18nextProvider } from "@/locale/client-config";
import { getI18nInstance } from "@/locale/server-config";
import { detectLng } from "@/locale/detectLng";
import { language } from "@/services/type";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const i18n = await getI18nInstance();
  const lang = detectLng(i18n.language);
  const dir = lang === language.fa ? "rtl" : "ltr";

  return (
    <html className="dark" lang={lang} dir={dir}>
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
