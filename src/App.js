import React, { useState, useEffect } from 'react';
import SideBar from "./Components/Screens/SideBar";
import ProductManagementPage from "./Components/Screens/ProductMangement";
import UserManagementPage from "./Components/Screens/UserManagement";
import OrderManagementPage from './Components/Screens/OrderangementPage';
import Dashboard from './Components/Screens/Dashboard';
import RequisitionPage from './Components/Screens/RequistionPage';
import "./App.css";

function App() {
  // Load from localStorage or fallback to 'dashboard'
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem('activePage') || 'dashboard';
  });

  // Store active page in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activePage', activePage);
  }, [activePage]);

  const renderContent = () => {
    switch (activePage) {
      case 'product-management':
        return <ProductManagementPage />;
      case 'user-management':
        return <UserManagementPage />;
      case 'order-management':
        return <OrderManagementPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'requisition':
        return <RequisitionPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar setActivePage={setActivePage} activePage={activePage} />
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
