import { DirectionProvider } from "@/hoc/DirectionProvider";
import "./globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl" className="dark">
      <body>
        <DirectionProvider>{children}</DirectionProvider>
      </body>
    </html>
  );
}
