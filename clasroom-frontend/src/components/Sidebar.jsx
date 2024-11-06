import React, { useState } from "react";
import bulb from "../assets/bulb.png";
import contest from "../assets/contest.png";
import dashboard from "../assets/dashboard.png";
import group from "../assets/group.png";
import star from "../assets/star.png";
import upskill from "../assets/upskill.png";
import UpSkill from "./UpSkill";

const SidebarItem = ({ icon, label, isOpen, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center p-2 rounded-md cursor-pointer transition-colors hover:bg-[#D6F4FF] ml-7 mr-4 md:ml-0"
  >
    <img src={icon} alt={label} className="w-5 h-5" />
    <span
      className={`ml-3 font-light text-base whitespace-nowrap transition-all p-1 ${
        isOpen
          ? "opacity-100 visible translate-x-0"
          : "opacity-0 invisible -translate-x-4"
      }`}
    >
      {label}
    </span>
  </div>
);

const Sidebar = ({ isOpen, onToggleSidebar }) => {
  const [selectedItem, setSelectedItem] = useState("Upskill");

  return (
    <div className="flex w-full min-h-screen">
      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 md:hidden overlay"
          style={{
            zIndex: 40,
            backgroundColor: "rgba(23, 43, 77, 0.8)",
          }}
          onClick={onToggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 md:top-5 left-0 h-full w-64 md:w-64 md:h-screen md:mx-4 transition-transform transform bg-white rounded-lg md:bg-transparent shadow-lg md:shadow-none z-40 md:pl-4 ${
          isOpen ? "block" : "hidden md:block"
        }`}
        style={{
          width: isOpen ? "15rem" : "4.375rem",
          minWidth: isOpen ? "13rem" : "4.375rem",
          flexShrink: 0
        }}
      >
        <div className="space-y-4 mt-24 md:mt-0">
          <SidebarItem
            icon={dashboard}
            label="Dashboard"
            isOpen={isOpen}
            onClick={() => setSelectedItem("Dashboard")}
          />
          <SidebarItem
            icon={bulb}
            label="Learn"
            isOpen={isOpen}
            onClick={() => setSelectedItem("Learn")}
          />
          <SidebarItem
            icon={group}
            label="Forums"
            isOpen={isOpen}
            onClick={() => setSelectedItem("Forums")}
          />
          <SidebarItem
            icon={upskill}
            label="Upskill"
            isOpen={isOpen}
            onClick={() => setSelectedItem("Upskill")}
          />
          <SidebarItem
            icon={contest}
            label="Contest"
            isOpen={isOpen}
            onClick={() => setSelectedItem("Contest")}
          />
          <SidebarItem
            icon={star}
            label="Leaderboard"
            isOpen={isOpen}
            onClick={() => setSelectedItem("Leaderboard")}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 mt-4 md:mt-5 md:mr-7">
        <div className="w-full h-full">
          {selectedItem === "Upskill" && <UpSkill />}
          {selectedItem === "Dashboard" && <div>Dashboard Content</div>}
          {selectedItem === "Learn" && <div>Learn Content</div>}
          {selectedItem === "Forums" && <div>Forums Content</div>}
          {selectedItem === "Contest" && <div>Contest Content</div>}
          {selectedItem === "Leaderboard" && <div>Leaderboard Content</div>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;