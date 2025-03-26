import "@/styles/index.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import {Header} from '@/components/layout/header/Header'
import { Providers } from "@/app/providers";
import { siteConfig } from "@/config/site";
import { myFont } from '@/app/font/font'
import { SearchProvider } from "./search/search-context";
import { TailwindBG } from "@/components/layout/bg/tailwind";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ProgressBar } from "@/components/layout/header/ProgressBar";
import { AppSidebar } from "@/components/layout/sidebar";
import { Suspense } from "react";
import { LoadingS } from "@/components/ui/loading/Loading";

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


export default async function RootLayout({ 
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang='zh'  >
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          myFont.className,
        )}
      ><Suspense fallback={<LoadingS />}>

        <Providers attribute="class" defaultTheme="dark" >
        <SearchProvider>
        <section className="flex  items-center pb-[30vh] -mb-[30vh] h-gradient "></section>
          <TailwindBG />
            <SidebarProvider>
            <AppSidebar locale={"zh"} />
            <SidebarInset className=' justify-between bg-transparent'>
              <Header  />
              {children}
              <ProgressBar />
            </SidebarInset>
            </SidebarProvider>
            <section className="w-full text-amber-100/70 !max-w-none prose dark:prose-invert text-center pt-[20vh] -mt-[20vh] f-gradient" ></section>
        </SearchProvider>
        </Providers>
      </Suspense>
      </body>
    </html>
  );
}
