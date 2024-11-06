import React, { useState, useEffect } from "react";
import "../styles/UpSkill.css";
import brief from "../assets/briefcase.png";
import calendar from "../assets/calendar.png";
import i from "../assets/i.png";
import Learning from "./Learning";

const ButtonNavbar = ({ activeTab, onTabChange }) => {
  const [prevActiveTab, setPrevActiveTab] = useState(activeTab);

  useEffect(() => {
    if (prevActiveTab !== activeTab) {
      setPrevActiveTab(activeTab);
    }
  }, [activeTab]);

  return (
    <div className="p-2 flex justify-between items-center h-16">
      <div className="navbar-container hide-scrollbar flex h-14 items-center px-2">
        <button
          type="button"
          className={`ant-btn ${
            activeTab === "Mentor Sessions"
              ? "navbar-button-active button-enter font-semibold"
              : prevActiveTab === "Mentor Sessions"
              ? "button-exit"
              : "navbar-button"
          }`}
          onClick={() => onTabChange("Mentor Sessions")}
        >
          <span className="flex items-center">
            <img
              src={calendar}
              alt="Mentor Sessions"
              className="w-5 h-5 mr-2"
            />
            Mentor Sessions
          </span>
        </button>
        <button
          type="button"
          className={`ant-btn ${
            activeTab === "Learning Material"
              ? "navbar-button-active button-enter font-semibold"
              : prevActiveTab === "Learning Material"
              ? "button-exit"
              : "navbar-button"
          }`}
          onClick={() => onTabChange("Learning Material")}
        >
          <span className="flex items-center">
            <img src={brief} alt="Mentor Sessions" className="w-5 h-5 mr-2" />
            Learning Material
          </span>
        </button>
      </div>
      <div className="ml-auto border rounded-lg px-3 py-2 how-it-work font-semibold">
        <span className="flex items-center">
          <img src={i} alt="Mentor Sessions" className="w-5 h-5 mr-2" />
          How it works
        </span>
      </div>
    </div>
  );
};

const Upskill = () => {
  const [activeTab, setActiveTab] = useState("Learning Material");

  const renderContent = () => {
    switch (activeTab) {
      case "Mentor Sessions":
        return <div>Content for Mentor Sessions</div>;
      case "Learning Material":
        return <Learning/>;
      default:
        return null;
    }
  };

  return (
    <div className="course-box mb-5 md:mb-3 p-4 flex flex-col">
      <ButtonNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default Upskill;
