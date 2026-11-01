import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { siteConfig } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const TITLE = "Вантажники у Вінниці — квартирні та офісні переїзди | VinGo";
const DESCRIPTION =
  "Вантажники у Вінниці та області 24/7: квартирні й офісні переїзди, перенесення меблів і техніки, вантажне таксі. Приїзд від 30 хв. Тел. 097 336 37 33.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: TITLE,
    template: "%s | VinGo",
  },
  description: DESCRIPTION,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "/",
    siteName: siteConfig.name,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-body-small focus:font-semibold focus:text-background-primary"
        >
          Перейти до вмісту
        </a>
        <Header />
        {children}
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
