import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const TASK_TABS = [
  { id: "upcoming", label: "Upcoming" },
  { id: "overdue", label: "Overdue" },
  { id: "completed", label: "Completed" },
];

const TASKS = [
  { id: 1, title: "Task 1", tab: "upcoming", assignee: "Pavithran S", date: "Today - 24 Feb" },
  { id: 2, title: "Task 2", tab: "upcoming", assignee: "Pavithran S", date: "23 - 25 Feb" },
  { id: 3, title: "Fix pending reports", tab: "overdue", assignee: "Pavithran S", date: "15 - 18 Feb" },
  { id: 4, title: "Review billing list", tab: "completed", assignee: "Pavithran S", date: "18 - 19 Feb" },
];

function getInitials(fullName) {
  return fullName
    .split(" ")
    .map((namePart) => namePart[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const userName = "Pavithran S";

  const visibleTasks = useMemo(
    () => TASKS.filter((task) => task.tab === activeTab),
    [activeTab],
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Welcome, User</h2>
            <p className="theme-muted text-sm mt-1">
              Here is your task overview.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/project/1")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Navigate to Tasks
          </button>
        </div>

        <section className="home-task-panel">
          <div className="home-task-header">
            <div className="home-profile-wrap">
              <div className="home-avatar">{getInitials(userName)}</div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-semibold leading-none">My tasks</h3>

                </div>

                <div className="flex items-center gap-6 mt-4 flex-wrap">
                  {TASK_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`home-task-tab ${activeTab === tab.id ? "home-task-tab-active" : ""}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button type="button" className="home-menu-btn" aria-label="Task options">
              ...
            </button>
          </div>

          <div className="home-divider" />

          <div className="home-create-row">
            <button type="button" className="home-create-btn">
              + Create task
            </button>
          </div>

          <div className="px-5 pb-6 overflow-x-auto">
            <table className="w-full min-w-[760px] home-task-table">
              <tbody>
                {visibleTasks.map((task) => (
                  <tr key={task.id} className="home-task-row">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <button type="button" aria-label={`Mark ${task.title} as complete`} className="home-check" />
                        <span>{task.title}</span>
                      </div>
                    </td>

                    <td className="py-3 pr-4 text-right">
                      <span className="home-assignee-pill">
                        <span className="home-assignee-dot" />
                        <span className="max-w-[110px] truncate">{task.assignee}</span>
                      </span>
                    </td>

                    <td className="py-3 text-right theme-muted whitespace-nowrap">{task.date}</td>
                  </tr>
                ))}

                {visibleTasks.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center theme-muted">
                      No tasks in this tab.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
