import "@/styles/index.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import {Header} from '@/components/layout/header/Header'
import { Providers } from "@/components/providers/providers";
import { siteConfig, siteMetadata } from "@/app/settings/site";
import { myFont } from '@/app/font/font'
import { SearchProvider } from "./search/search-context";
import { TailwindBG } from "@/components/layout/bg/tailwind";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ProgressBar } from "@/components/layout/header/ProgressBar";
import { AppSidebar } from "@/components/layout/sidebar";
import { Suspense } from "react";
import { LoadingS } from "@/components/ui/loading/Loading";
import Footer from "@/components/layout/Footer";
import { EnhancedSearchModal } from "./search/enhanced-search-modal";
import { BackToTop } from "@/components/layout/backToTop";
import { ScrollProvider } from "@/components/layout/ScrollContext";
import { SidebarConfigProvider } from "./settings/SidebarConfigContext";

export const metadata: Metadata = {
  title: {
    default: siteMetadata.name,
    template: `%s | ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
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

export default async function RootLayout({ 
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang='zh' className={`scroll-smooth ${ myFont.className}`} >
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {/* iOS 图标 */}
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/Nahida-120-r.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/Nahida-152-r.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/favicons/Nahida-167-r.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/Nahida-180-r.png" />
        {/* iOS PWA 配置 */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="manifest" href={`/manifest.webmanifest`} />
      </head>
      <body
        className={clsx(
          "min-h-screen  bg-background font-sans antialiased",
        )}
      ><Suspense fallback={<LoadingS />}>
        <ScrollProvider>
          
        <Providers attribute="class" defaultTheme="dark" >
        <SearchProvider>
        <section className="flex  items-center pb-[30vh] -mb-[30vh] h-gradient "></section>
          <TailwindBG />
            <SidebarConfigProvider>
            <AppSidebar  />
            <SidebarInset className=' justify-between bg-transparent'>
              <Header  />
              {children}
              <ProgressBar />
              <EnhancedSearchModal />
              <Footer />
            </SidebarInset>
            </SidebarConfigProvider>
            <section className="w-full text-amber-100/70 !max-w-none prose dark:prose-invert text-center pt-[20vh] -mt-[20vh] f-gradient" ></section>
        </SearchProvider>

        </Providers>
        <BackToTop />
        </ScrollProvider>
      </Suspense>
      </body>
    </html>
  );
}
