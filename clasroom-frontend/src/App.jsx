import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div
      className="min-h-screen px-3 pt-4"
      style={{
        background:
          "linear-gradient(0deg, rgba(143, 223, 255, 0.2), rgba(255, 255, 255, 0.5))",
      }}
    >
      <Navbar />
    </div>
  );
}

export default App;
