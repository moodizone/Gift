import { DirectionProvider } from "@/hoc/DirectionProvider";
import "./globals.scss";
import ErrorBoundaryProvider from "@/hoc/ErrorBoundary";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl" className="dark">
      <body>
        <DirectionProvider>
          <ErrorBoundaryProvider>{children}</ErrorBoundaryProvider>{" "}
        </DirectionProvider>
      </body>
    </html>
  );
}
