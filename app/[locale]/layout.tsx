import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import {Header} from '@/components/layout/header/Header'
import { Providers } from "@/app/providers";

import { siteConfig } from "@/config/site";
import { myFont } from '@/app/font/font'
import { Navbar } from "@/components/navbar";
import initTranslations from "../i18n/i18n";
import { dir } from "i18next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({ params, 
  children,
}: {params: Promise<{ locale: string }>,
  children: React.ReactNode;
}) {
  const { locale } = await params
  const { t, resources } = await initTranslations(locale, ['common']);
  return (
    <html suppressHydrationWarning lang={locale} dir={dir(locale)}  >
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          myFont.className,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
            <Header  />
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://heroui.com?utm_source=next-app-template"
                title="heroui.com homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">HeroUI</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
