"use client";
import { Suspense } from 'react';
import { LoadingS } from '@/components/ui/loading/Loading';
import { SidebarConfig, useSidebarConfig } from './SidebarConfigContext';
import {Select, SelectItem} from "@heroui/select";
import { DocsToc } from '../md/comp/DocsToc';
import { Toc } from '../md/types';

const defaultOpenLs = [
  { label: "Yes", value: true },
  { label: "No", value: false },
]
const sideOptions = [
  { label: "Left", key: "left" },
  { label: "Right", key: "right" },
]
const variantOptions = [
  { label: "Sidebar", key: "sidebar" },
  { label: "Floating", key: "floating" },
  { label: "Inset", key: "inset" },
]
const collapsibleOptions = [
  { label: "Offcanvas", key: "offcanvas" },
  { label: "Icon", key: "icon" },
  { label: "None", key: "none" },
]
export default function Page ({
}: {
}) {
  const { sidebarConfig, updateSidebarConfig } = useSidebarConfig();
  const toc:Toc[] = []
  return <Suspense fallback={<LoadingS />}>
  <section className='px-4 sm:px-6 w-full min-w-0  flex-1 grid grid-cols-12'>
    <article className="prose dark:prose-invert  col-span-12 lg:col-span-9 lg:px-4 xl:col-span-9 xl:px-8
    mx-auto w-full min-w-0 max-w-full ">
    <h1 className="text-xl font-bold mb-4"> Settings</h1>
    {/* Side Option */}
    <Select
      className="max-w-xs" variant='underlined'
      label="Default Open" 
      defaultSelectedKeys={[sidebarConfig.defaultOpen ? "Yes" : "No"]}
      selectedKeys={[sidebarConfig.defaultOpen ? "Yes" : "No"]}
      onSelectionChange={(value) => {
        updateSidebarConfig({ defaultOpen: String(value.currentKey) === "Yes" });
      }}
    >
      {defaultOpenLs.map((item) => (
        <SelectItem key={item.label}>{item.label}</SelectItem>
      ))}
    </Select>
    {/* Side Option */}
    <Select
      className="max-w-xs" variant='underlined'
      label="Side Option" 
      defaultSelectedKeys={[sidebarConfig.side || "left"]}
      selectedKeys={[sidebarConfig.side || "left"]}
      onSelectionChange={(value) => {
        updateSidebarConfig({ side: value.currentKey as SidebarConfig["side"] });
      }}
    >
      {sideOptions.map((item) => (
        <SelectItem key={item.key}>{item.label}</SelectItem>
      ))}
    </Select>

    {/* Variant Option */}
    <Select className="max-w-xs" variant='underlined' label="Variant Option"
      defaultSelectedKeys={[sidebarConfig.variant || "sidebar"]}
      selectedKeys={[sidebarConfig.variant || "sidebar"]}
      onSelectionChange={(value) => {
        updateSidebarConfig({ variant: value.currentKey as SidebarConfig["variant"] });
      }}
    >
      {variantOptions.map((item) => (
        <SelectItem key={item.key}>{item.label}</SelectItem>
      ))}
    </Select>
    {/* Collapsible Option */}
    <Select
      className="max-w-xs" variant='underlined'
      label="Collapsible Option" 
      defaultSelectedKeys={[sidebarConfig.collapsible || "none"]}
      selectedKeys={[sidebarConfig.collapsible || "none"]}
      onSelectionChange={(value) => {
        updateSidebarConfig({ collapsible: value.currentKey as SidebarConfig["collapsible"] });
      }}
    >
      {collapsibleOptions.map((item) => (
        <SelectItem key={item.key}>{item.label}</SelectItem>
      ))}
    </Select>
    </article>
    <DocsToc toc={toc} />
  </section>
  </Suspense>
}