"use client"
import * as React from "react"
import tagsJson from '@/public/data/tags.json';
const tagObjsKV: DocTagsKV = tagsJson
import {Chip} from "@heroui/chip";
import {Tooltip} from "@heroui/tooltip";
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
// import { headers, cookies } from 'next/headers'
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { ModeToggleGradientIcon } from "@/components/common/ModeToggle";
import Link from "@/components/Link"
import { SettingsIcon } from "@/components/common/button"
import { navItems } from "@/app/settings/site"
import { usePathname } from "next/navigation"
import { useSidebarConfig } from "@/app/settings/SidebarConfigContext"
import { DocTagsKV } from "@/app/md/lib/to";


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
  const sortedKeys = Object.keys(tagObjsKV).sort(); // ["api", "html", "web"]
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
          <SidebarGroupContent className={`space-y-1 space-x-1 ${open||openMobile ? "":"hidden"}`}>
          {sortedKeys.map((tag) => (
            <Tooltip key={tag} content={`该标签下有${tagObjsKV[tag].count}篇文章`} showArrow={true}>
            <Link href={`/tags/${tag}`} key={tag}  className="inline-block" >
            <Chip key={tag} >
              {tag}
            </Chip>
          </Link>
            </Tooltip>
          ))}
          </SidebarGroupContent>
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
