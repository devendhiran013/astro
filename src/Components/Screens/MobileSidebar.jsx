"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../Screens/SideBar";

export default function MobileSidebar({ activePage, setActivePage }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="md:hidden relative">
      {/* Top Navbar */}
      <div className="flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-10 h-10 border border-gray-500 rounded-full p-1"
          />
          <span className="font-bold text-lg">AstroGlow</span>
        </div>

        {/* Hamburger Menu */}
        <button onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Slide-Out Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 transform bg-[#FFD641] transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar activePage={activePage} setActivePage={(page) => {
          setActivePage(page);
          setSidebarOpen(false); // close sidebar on click
        }} />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
