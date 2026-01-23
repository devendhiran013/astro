import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import SideBar from "./Components/Screens/SideBar";
import ProductManagementPage from "./Components/Screens/ProductMangement";
import UserManagementPage from "./Components/Screens/UserManagement";
import OrderManagementPage from "./Components/Screens/OrderMangementPage";
import Dashboard from "./Components/Screens/Dashboard";
import RequisitionPage from "./Components/Screens/RequistionPage";
import AdminLogin from "./Components/Screens/Login";
import AdminRegister from "./Components/Screens/Register";

export default function App() {
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleMobileNavigate = (id, path) => {
    setIsMobileSidebarOpen(false);
    setTimeout(() => navigate(path), 150);
  };

  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES (NO SIDEBAR) */}
        <Route path="/" element={<Navigate to="/admin-login" replace />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
      </Routes>
      {/* ADMIN PAGES WITH SIDEBAR */}

      <div className="flex h-screen overflow-hidden">

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-80">
          <SideBar onNavigate={(id, path) => navigate(path)} />
        </div>

        {/* Mobile Sidebar */}
        {isMobileSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
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

        {/* MAIN CONTENT  */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product-management" element={<ProductManagementPage />} />
            <Route path="/user-management" element={<UserManagementPage />} />
            <Route path="/order-management" element={<OrderManagementPage />} />
            <Route path="/requisition" element={<RequisitionPage />} />
          </Routes>
        </div>
      </div>



    </>
  );
}
