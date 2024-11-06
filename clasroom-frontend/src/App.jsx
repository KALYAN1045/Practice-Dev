import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className="flex flex-col min-h-screen md:p-4"
      style={{
        background:
          "linear-gradient(0deg, rgba(143, 223, 255, 0.2), rgba(255, 255, 255, 0.5))",
      }}
    >
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">{/* Main content */}</main>
      </div>
    </div>
  );
};

export default App;
