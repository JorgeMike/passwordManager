"use client";
import React from "react";
import tabs from "../../utils/data.json";
import { useTabsContext } from "../../context/TabsContext";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

export default function Pills() {
  const { activeTab, setActiveTab } = useTabsContext();
  return (
    <nav className="d-flex align-items-center justify-content-center gap-2">
      <ul
        className="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-pill shadow-sm"
        role="tablist"
      >
        {tabs.map((tab, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <button
              className={`nav-link rounded-5 ${
                activeTab === tab.id ? "bg-white text-primary" : ""
              }`}
              id={`home-tab${tab.id}`}
              data-bs-toggle="tab"
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
      <Link
        href={"/login"}
        className="btn btn-primary d-flex align-items-center justify-content-center  text-white border rounded-circle"
        style={{
          width: "45px",
          height: "45px",
        }}
      >
        <FaUser size={20} />
      </Link>
    </nav>
  );
}
