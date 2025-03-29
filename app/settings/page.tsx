"use client";
import { Suspense } from 'react';
import { LoadingS } from '@/components/ui/loading/Loading';
import { SidebarConfig, useSidebarConfig } from './SidebarConfigContext';
import {Select, SelectItem} from "@heroui/select";

export default function Page ({
}: {
}) {
  const { sidebarConfig, updateSidebarConfig } = useSidebarConfig();
  return <Suspense fallback={<LoadingS />}>
    <h1 className="text-xl font-bold mb-4">Sidebar Settings</h1>
          {/* Side Option */}
          <div className="mb-4">
  <label className="block mb-2 font-medium">Default Open</label>
  <input
    type="checkbox"
    checked={sidebarConfig.defaultOpen}
    onChange={(e) => updateSidebarConfig({ defaultOpen: e.target.checked })}
    className="border rounded px-2 py-1"
  />
</div>
    <div className="mb-4">
        <label className="block mb-2 font-medium">Side</label>
        <select
          value={sidebarConfig.side}
          onChange={(e) => updateSidebarConfig({ side: e.target.value as SidebarConfig["side"] })}
          className="border rounded px-2 py-1"
        >
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>
          {/* Variant Option */}
          <div className="mb-4">
        <label className="block mb-2 font-medium">Variant</label>
        <select
          value={sidebarConfig.variant}
          onChange={(e) => updateSidebarConfig({ variant: e.target.value as SidebarConfig["variant"] })}
          className="border rounded px-2 py-1"
        >
          <option value="sidebar">Sidebar</option>
          <option value="floating">Floating</option>
          <option value="inset">Inset</option>
        </select>
      </div>

      {/* Collapsible Option */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Collapsible</label>
        <select
          value={sidebarConfig.collapsible}
          onChange={(e) => updateSidebarConfig({ collapsible: e.target.value as SidebarConfig["collapsible"] })}
          className="border rounded px-2 py-1"
        >
          <option value="offcanvas">Offcanvas</option>
          <option value="icon">Icon</option>
          <option value="none">None</option>
        </select>
      </div>
  </Suspense>
}