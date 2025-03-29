"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { createContext, useContext, useState, useEffect } from "react";

export type SidebarConfig = {
  defaultOpen: boolean;
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
};

export const defaultConfig: SidebarConfig = {
  defaultOpen: false,
  side: "left",
  variant: "sidebar",
  collapsible: "icon",
};

// 创建 Context
const SidebarConfigContext = createContext<{
  sidebarConfig: SidebarConfig;
  updateSidebarConfig: (newConfig: Partial<SidebarConfig>) => void;
}>({
  sidebarConfig: defaultConfig,
  updateSidebarConfig: () => {},
});

// 提供者组件
export const SidebarConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarConfig, setSidebarConfig] = useState<SidebarConfig>(defaultConfig);

  // 从 localStorage 加载配置
  useEffect(() => {
    const storedConfig = localStorage.getItem("sidebarConfig");
    if (storedConfig) {
      setSidebarConfig(JSON.parse(storedConfig));
    }
  }, []);

  // 更新配置并保存到 localStorage
  const updateSidebarConfig = (newConfig: Partial<SidebarConfig>) => {
    const updatedConfig = { ...sidebarConfig, ...newConfig };
    setSidebarConfig(updatedConfig);
    localStorage.setItem("sidebarConfig", JSON.stringify(updatedConfig));
  };

  return (
    <SidebarConfigContext.Provider value={{ sidebarConfig, updateSidebarConfig }}>
      <SidebarProvider defaultOpen={sidebarConfig.defaultOpen}>
      {children}
      </SidebarProvider>
    </SidebarConfigContext.Provider>
  );
};

// 自定义 Hook
export const useSidebarConfig = () => useContext(SidebarConfigContext);