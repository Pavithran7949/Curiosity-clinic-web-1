import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import ListView from "../views/ListView";
import BoardView from "../views/BoardView";
import TimelineView from "../views/TimelineView";
import CalendarView from "../views/CalendarView";

export default function Project() {
  const [view, setView] = useState("list");
  const viewTabs = [
    { id: "list", label: "Lists" },
    { id: "board", label: "Board" },
    { id: "timeline", label: "Timeline" },
    { id: "calendar", label: "Calendar" },
  ];

  const renderView = () => {
    switch (view) {
      case "board":
        return <BoardView />;
      case "timeline":
        return <TimelineView />;
      case "calendar":
        return <CalendarView />;
      default:
        return <ListView />;
    }
  };

  return (
    <MainLayout>
      <div>
        <div className="flex gap-3 mb-6 flex-wrap">
          {viewTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setView(tab.id)}
              className={`theme-tab-button px-4 py-2 rounded text-sm ${
                view === tab.id ? "theme-tab-button-active" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {renderView()}
      </div>
    </MainLayout>
  );
}
