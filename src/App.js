import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import SideBar from "./Components/Screens/SideBar";
import ProductManagementPage from "./Components/Screens/ProductMangement";
import UserManagementPage from "./Components/Screens/UserManagement";
import OrderManagementPage from "./Components/Screens/OrderMangementPage";
import Dashboard from "./Components/Screens/Dashboard";
import RequisitionPage from "./Components/Screens/RequistionPage";

import "./App.css";

function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Mobile navigation handler
  const handleMobileNavigate = (id, path) => {
    setIsMobileSidebarOpen(false); // close first

    // wait for sidebar animation to finish, then navigate
    setTimeout(() => {
      navigate(path);
    }, 150);
  };

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Desktop Sidebar (Left side) */}
      <div className="hidden md:block w-80">
        <SideBar onNavigate={(id, path) => navigate(path)} />
      </div>

      {/* Mobile Sidebar (Right side) */}
      {isMobileSidebarOpen && (
        <>
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Slide-in Sidebar */}
          <div className="fixed top-0 right-0 w-64 h-full bg-[#FFD641] z-50 shadow-xl">
            <SideBar onNavigate={handleMobileNavigate} />
          </div>
        </>
      )}

      {/* Mobile Menu Button */}
      <button
        className="md:hidden absolute top-4 right-4 z-50 text-3xl"
        onClick={() => setIsMobileSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product-management" element={<ProductManagementPage />} />
          <Route path="/user-management" element={<UserManagementPage />} />
          <Route path="/order-management" element={<OrderManagementPage />} />
          <Route path="/requisition" element={<RequisitionPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
