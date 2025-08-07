import React, { useState, useEffect } from 'react';
import SideBar from "./Components/Screens/SideBar";
import ProductManagementPage from "./Components/Screens/ProductMangement";
import UserManagementPage from "./Components/Screens/UserManagement";
import OrderManagementPage from './Components/Screens/OrderangementPage';
import Dashboard from './Components/Screens/Dashboard';
import RequisitionPage from './Components/Screens/RequistionPage';
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem('activePage') || 'dashboard';
  });

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // Mobile toggle

  useEffect(() => {
    localStorage.setItem('activePage', activePage);
  }, [activePage]);

  const renderContent = () => {
    switch (activePage) {
      case 'product-management': return <ProductManagementPage />;
      case 'user-management': return <UserManagementPage />;
      case 'order-management': return <OrderManagementPage />;
      case 'dashboard': return <Dashboard />;
      case 'requisition': return <RequisitionPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Sidebar (hidden on small screens) */}
      <div className="hidden md:block">
        <SideBar setActivePage={setActivePage} activePage={activePage} />
      </div>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Sidebar: Slide in from RIGHT */}
          <div className="fixed top-0 right-0 w-64 h-full bg-yellow-400 z-50">
            <SideBar
              setActivePage={(page) => {
                setActivePage(page);
                setIsMobileSidebarOpen(false);
              }}
              activePage={activePage}
            />
          </div>
        </>
      )}


      {/* Main content */}
      <div className="flex-1 overflow-y-auto relative z-10">
        {/* Mobile menu button */}
        <button
          className="md:hidden absolute top-4 right-4 z-50"
          onClick={() => setIsMobileSidebarOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>

        {renderContent()}
      </div>
    </div>
  );
}

export default App;
