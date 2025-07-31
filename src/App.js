import React, { useState } from 'react';
import SideBar from "./Components/Screens/SideBar";
import ProductManagementPage from "./Components/Screens/ProductMangement"; // Corrected import name
import UserManagementPage from "./Components/Screens/UserManagement"; 
import OrderManagementPage from './Components/Screens/OrderangementPage';
import  Dashboard from './Components/Screens/Dashboard';
import RequisitionPage from './Components/Screens/RequistionPage'; // Assuming you have a Dashboard component
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState('product-management'); // State to manage active page

  // Function to render the content based on activePage state
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
      // Add more cases for other pages as you create them
      default:
        return <ProductManagementPage />; // Default to product management
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Pass setActivePage function to SideBar so it can update the parent's state */}
      <SideBar setActivePage={setActivePage} activePage={activePage} />
      <div className="flex-1 overflow-y-auto"> {/* flex-1 makes it take remaining space, overflow-y-auto for scrolling */}
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
