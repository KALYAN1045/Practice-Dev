import React, { useState } from "react";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { courseData } from "../utils/chapters";
import contest from "../assets/contest.png";
import docs from "../assets/docs.png";
import play from "../assets/play.png";
import coding from "../assets/coding.png";
import clock from "../assets/clock.png";
import chart from "../assets/chart.png";
import article from "../assets/article.png";

const Learning = () => {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [expandedParts, setExpandedParts] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 940);

  // Update `isMobile` when the screen is resized
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 940);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const togglePart = (chapterId, partId) => {
    setExpandedParts((prev) => ({
      ...prev,
      [`${chapterId}-${partId}`]: !prev[`${chapterId}-${partId}`],
    }));
  };

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      //   case "easy":
      //     return "text-green-500";
      //   case "medium":
      //     return "text-yellow-500";
      //   case "hard":
      //     return "text-red-500";
      default:
        return "text-[#17384D]";
    }
  };

  return (
    <div
      className={`learning-container flex min-h-screen ${
        isMobile ? "flex-col" : ""
      }`}
    >
      {/* Chapter Selection for Mobile */}
      {isMobile ? (
        <div className="flex justify-center mb-4">
          <select
            className="p-2 rounded border border-gray-300 text-center"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(Number(e.target.value))}
          >
            {courseData.chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                Chapter {chapter.id}
              </option>
            ))}
          </select>
        </div>
      ) : (
        /* Left Sidebar for Desktop */
        <div className="w-64 p-4">
          {courseData.chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setSelectedChapter(chapter.id)}
              className={`w-full text-left p-3 rounded-lg mb-2 py-4 ${
                selectedChapter === chapter.id
                  ? "bg-blue-50 text-black font-bold"
                  : "hover:bg-gray-50 text-gray-500"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>Chapter {chapter.id}</div>
                <div className="flex items-center text-sm mt-1">
                  {selectedChapter === chapter.id && (
                    <Clock className="w-4 h-4 mr-1 text-[#608AD2]" />
                  )}
                  <span
                    className={
                      selectedChapter === chapter.id
                        ? "text-[#608AD2] font-normal"
                        : "hidden"
                    }
                  >
                    {chapter.totalTime}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 p-6`}>
        {courseData.chapters
          .find((chapter) => chapter.id === selectedChapter)
          ?.parts.map((part) => (
            <div key={part.id} className="mb-4">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm relative">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm relative">
                  <div
                    className={`${
                      isMobile ? "pb-12" : ""
                    } p-4 pb-12 cursor-pointer relative`}
                    onClick={() => togglePart(selectedChapter, part.id)}
                  >
                    {/* Part Title */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <span className="font-light">PART {part.id}</span>
                        <span className="font-bold">{part.title}</span>
                      </div>

                      {/* Right Section: Time - Difficulty - Modules */}
                      <div
                        className={`flex ${
                          isMobile
                            ? "flex-col space-y-2 mt-2"
                            : "items-center space-x-4"
                        } text-[#17384D]`}
                      >
                        <div className="flex items-center space-x-1">
                          <img
                            src={clock}
                            alt="Time"
                            className={`w-5 h-5 ${isMobile ? "mr-1" : ""}`}
                          />
                          <span className={isMobile ? "text-sm" : ""}>
                            {part.time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img
                            src={chart}
                            alt="Difficulty"
                            className={`w-5 h-5 ${isMobile ? "mr-1" : ""}`}
                          />
                          <span
                            className={`${getLevelColor(part.level)} ${
                              isMobile ? "text-sm" : ""
                            }`}
                          >
                            {part.level}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img
                            src={docs}
                            alt="Modules"
                            className={`w-5 h-5 ${isMobile ? "mr-1" : ""}`}
                          />
                          <span className={isMobile ? "text-sm" : ""}>
                            {part.modules}
                          </span>
                        </div>
                        {expandedParts[`${selectedChapter}-${part.id}`] ? (
                          <ChevronUp
                            className={`w-5 h-5 text-[#17384D] ${
                              isMobile ? "mt-1" : ""
                            }`}
                          />
                        ) : (
                          <ChevronDown
                            className={`w-5 h-5 text-[#17384D] ${
                              isMobile ? "mt-1" : ""
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    {/* Completion Percentage Box - Bottom Right */}
                    <div
                      className={`absolute ${
                        isMobile
                          ? "bottom-0 right-0 mb-4 mr-2 text-xs px-1 py-1 w-28"
                          : "bottom-0 right-0 mb-3 mr-4 text-sm px-2 py-1 w-32"
                      } rounded-lg border border-[#99E4FF] bg-[#EFF5FF] text-[#17384D] font-medium shadow-sm`}
                    >
                      {Math.round((part.completedModules / part.modules) * 100)}
                      % Completed
                    </div>
                  </div>
                </div>

                {/* Completion Bar (Outside of Box) */}
                {part.completedModules > 0 && (
                  <div
                    className="left-0 right-0 h-2 rounded-b-lg overflow-hidden"
                    style={{
                      background: "linear-gradient(to right, #EFF5FF, #EFF5FF)",
                      borderBottomLeftRadius: "8px",
                      borderBottomRightRadius: "8px",
                      bottom: "-2px",
                    }}
                  >
                    <div
                      className="h-full bg-[#172B4D] rounded-b-lg"
                      style={{
                        width: `${
                          (part.completedModules / part.modules) * 100
                        }%`,
                        borderBottomLeftRadius: "8px",
                        borderBottomRightRadius:
                          part.completedModules === part.modules
                            ? "8px"
                            : "0px",
                      }}
                    ></div>
                  </div>
                )}

                {/* Expanded Content */}
                {expandedParts[`${selectedChapter}-${part.id}`] && (
                  <div className="border-t border-gray-200 p-4 space-y-2">
                    {part.content.map((item, index) => {
                      let icon;
                      switch (true) {
                        case item.toLowerCase().includes("video"):
                          icon = play;
                          break;
                        case item.toLowerCase().includes("quiz"):
                          icon = article;
                          break;
                        case item.toLowerCase().includes("combined resource"):
                          icon = docs;
                          break;
                        case item.toLowerCase().includes("article"):
                          icon = article;
                          break;
                        case item.toLowerCase().includes("exercise"):
                          icon = coding;
                          break;
                        default:
                          icon = null;
                      }
                      return (
                        <div key={index} className="flex flex-col">
                          <div className="flex items-center justify-between p-6">
                            <div className="flex items-center space-x-2">
                              {icon && (
                                <img
                                  src={icon}
                                  alt={item}
                                  className="w-5 h-5"
                                />
                              )}
                              <span className="text-[#17384D] font-semibold">
                                {item}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-[#17384D]">
                              <img
                                src={clock}
                                alt="Time"
                                className={`w-5 h-5 ${isMobile ? "mr-1" : ""}`}
                              />
                              <span className={isMobile ? "text-sm" : ""}>
                                10:00
                              </span>
                            </div>
                          </div>
                          {/* Gradient Line after each module */}
                          {index < part.content.length - 1 && (
                            <div
                              className="w-full h-[1px] bg-gradient-to-r from-[#172B4D00] via-[#172B4D] to-[#05445E00]"
                              style={{
                                transform: "scaleY(0.99)",
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Learning;
