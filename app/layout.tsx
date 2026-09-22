import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppShell } from "@/components/shell/AppShell";

// Self-hosted Public Sans (variable, latin) so builds never depend on a
// network fetch to Google Fonts. Font file sourced from
// @fontsource-variable/public-sans.
const publicSans = localFont({
  src: "./fonts/public-sans-latin-variable.woff2",
  variable: "--font-public-sans",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "finance — Overview",
  description: "Personal finance dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex font-sans text-grey-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
