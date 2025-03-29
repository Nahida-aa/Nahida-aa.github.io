"use client"
import * as React from "react"

import { SearchForm } from "@/components/common/search-form"
import { SideSwitcher } from "@/components/layout/sidebar/side-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar, 
} from "@/components/ui/sidebar"
import {ScrollShadow} from "@heroui/scroll-shadow";
import type { NavNode } from "@/lib/md/get";
import { ContentNavTree } from "./nav-tree";
// import { headers, cookies } from 'next/headers'
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { ModeToggleGradientIcon } from "@/components/common/ModeToggle";
import Link from "@/components/Link"
import { SettingsIcon } from "@/components/common/button"
import { navItems } from "@/app/settings/site"
import { usePathname } from "next/navigation"
import { useSidebarConfig } from "@/app/settings/SidebarConfigContext"


const sides = ["blog"]

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {

}
export function AppSidebar({...props }: AppSidebarProps) {
  const { sidebarConfig } = useSidebarConfig()
  const { side, variant, collapsible } = sidebarConfig
  const {state, open, openMobile} = useSidebar()
  console.log("AppSidebar", state, open, openMobile)
  const pathname = usePathname()
  // const cookieStore = await cookies()
  // const type = cookieStore.get('type')?.value || types[0]
  return (
    <Sidebar {...props} side={side} variant={variant} collapsible={collapsible} className="Sidebar bg-transparent justify-between h-screen">
      <SidebarHeader>
        <SideSwitcher
          list={sides}
          defaultItem={sides[0]}
        />
        {/* <SearchForm /> */}
      </SidebarHeader>
      <ScrollShadow hideScrollBar className="h-full" >
        <SidebarContent>
          {/* We create a SidebarGroup for each parent. */}
          {/* <ContentNavTree currentNavTree={currentNavTree} /> */}
          <SidebarGroup>
          <SidebarGroupLabel>Nav</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href} title={item.label} >
                      <item.icon className={`${pathname === item.href ? 'text-primary' : ''} `} />
                      <span className={`${pathname === item.href ? 'gradient' : ''}`}>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
          <SidebarGroupLabel>Tags</SidebarGroupLabel>
          <SidebarGroupContent></SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </ScrollShadow>
      <SidebarFooter>
      <SidebarMenu className={`flex-col ${collapsible=="none" ||state==="expanded" || openMobile ? "flex-row": ""} justify-between`}>
          <SidebarMenuItem className="flex items-center">
            {/* <SidebarMenuButton asChild 
            // onClick={() => {
            //     // toggleSidebar()
            //     // router.push('/setting');
            //     // setOpenMobile(false);
            //   }}
            </SidebarMenuButton>
            > */}
              <button  className='flex size-8 h-8 [&_svg]:size-5 items-center justify-center p-1.5'>
                <Link href={'/settings'}>
              {/* <Settings className="rotate-button" /> */}
              <SettingsIcon />
                </Link>
              </button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            {/* <SidebarMenuButton asChild> */}
              <ModeToggleGradientIcon  className='size-8  [&_svg]:size-5' />
            {/* </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
