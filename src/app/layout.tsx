import { DirectionProvider } from "@/hoc/DirectionProvider";
import ErrorBoundaryProvider from "@/hoc/ErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import "./globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <DirectionProvider>
          <ErrorBoundaryProvider>
            <Toaster />
            {children}
          </ErrorBoundaryProvider>{" "}
        </DirectionProvider>
      </body>
    </html>
  );
}
