"use client";
import React from "react";
import SimpleGenerator from "../../components/PasswordsGenerators/Simple/SimpleGenerator";
import { useTabsContext } from "../../context/TabsContext";
import MediumGenerator from "../../components/PasswordsGenerators/Medium/MediumGenerator";
import AdvancedGenerator from "../../components/PasswordsGenerators/Advanced/AdvancedGenerator";

export default function Page() {
  const { activeTab, setActiveTab } = useTabsContext();

  return (
    <div
      style={{
        flex: 1,
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      {activeTab === 1 && <SimpleGenerator />}
      {activeTab === 2 && <MediumGenerator />}
      {activeTab === 3 && <AdvancedGenerator />}
    </div>
  );
}
