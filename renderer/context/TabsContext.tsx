"use client";
import React, { createContext, ReactNode, useState } from "react";

// Define el tipo de dato para el estado de las tabs
type TabsState = {
  activeTab: number;
  setActiveTab: (tab: number) => void;
};

// Crea el contexto de las tabs
export const TabsContext = createContext<TabsState | undefined>(undefined);

export const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (context === undefined) {
    throw new Error("useTabsContext must be used within a TabsProvider");
  }
  return context;
};

// Crea el proveedor del contexto
export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState(1);

  // Define las funciones para actualizar el estado de las tabs
  const handleSetActiveTab = (tab: number) => {
    setActiveTab(tab);
  };

  // Crea el objeto de estado y funciones para pasarlo al contexto
  const tabsState: TabsState = {
    activeTab,
    setActiveTab: handleSetActiveTab,
  };

  return (
    <TabsContext.Provider value={tabsState}>{children}</TabsContext.Provider>
  );
};
