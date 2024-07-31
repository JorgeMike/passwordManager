import React, { ReactNode } from "react";
import { TabsProvider } from "../context/TabsContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <TabsProvider>
      <Toaster
        toastOptions={{
          className: "bg-secondary text-white",
        }}
      />
      {children}
    </TabsProvider>
  );
}
