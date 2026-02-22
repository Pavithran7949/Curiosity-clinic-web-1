import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import ListView from "../views/ListView";
import BoardView from "../views/BoardView";
import TimelineView from "../views/TimelineView";
import CalendarView from "../views/CalendarView";

export default function Project() {
  const [view, setView] = useState("list");

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

        <div className="flex gap-4 mb-6">
          <button onClick={() => setView("list")}>Lists</button>
          <button onClick={() => setView("board")}>Board</button>
          <button onClick={() => setView("timeline")}>Timeline</button>
          <button onClick={() => setView("calendar")}>Calendar</button>
        </div>

        {renderView()}

      </div>
    </MainLayout>
  );
}