import { useState } from "react";
import BoardColumn from "../components/BoardColumn";

const initialTasks = [
  { id: 1, title: "Design Login UI", status: "todo" },
  { id: 2, title: "Setup Database", status: "todo" },
  { id: 3, title: "Build API", status: "inprogress" },
  { id: 4, title: "Project Setup", status: "done" },
];

export default function BoardView() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState("todo");
  const [columnInputs, setColumnInputs] = useState({
    todo: "",
    inprogress: "",
    done: "",
  });

  const createTask = () => {
    if (!taskTitle.trim()) {
      return;
    }

    setTasks((previous) => [
      ...previous,
      {
        id: Date.now(),
        title: taskTitle,
        status: taskStatus,
      },
    ]);

    setTaskTitle("");
    setTaskStatus("todo");
    setShowModal(false);
  };

  const addTask = (status) => {
    const title = columnInputs[status];
    if (!title.trim()) {
      return;
    }

    setTasks((previous) => [
      ...previous,
      {
        id: Date.now(),
        title,
        status,
      },
    ]);

    setColumnInputs((previous) => ({
      ...previous,
      [status]: "",
    }));
  };

  const columns = {
    todo: tasks.filter((task) => task.status === "todo"),
    inprogress: tasks.filter((task) => task.status === "inprogress"),
    done: tasks.filter((task) => task.status === "done"),
  };

  const onDragStart = (event, taskId) => {
    event.dataTransfer.setData("taskId", taskId);
  };

  const onDrop = (event, newStatus) => {
    const taskId = Number(event.dataTransfer.getData("taskId"));
    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-blue-600 px-4 py-2 rounded text-sm"
        >
          + Add Task
        </button>
      </div>

      <div className="flex gap-6 w-full flex-1">
        <BoardColumn
          title="To Do"
          status="todo"
          tasks={columns.todo}
          columnInputs={columnInputs}
          setColumnInputs={setColumnInputs}
          addTask={addTask}
          onDragStart={onDragStart}
          onDrop={onDrop}
        />

        <BoardColumn
          title="In Progress"
          status="inprogress"
          tasks={columns.inprogress}
          columnInputs={columnInputs}
          setColumnInputs={setColumnInputs}
          addTask={addTask}
          onDragStart={onDragStart}
          onDrop={onDrop}
        />

        <BoardColumn
          title="Done"
          status="done"
          tasks={columns.done}
          columnInputs={columnInputs}
          setColumnInputs={setColumnInputs}
          addTask={addTask}
          onDragStart={onDragStart}
          onDrop={onDrop}
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 theme-overlay flex items-center justify-center">
          <div className="theme-surface border theme-border p-6 rounded-lg w-96 space-y-4">
            <h3 className="text-lg font-semibold">Add New Task</h3>

            <input
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              placeholder="Task name"
              className="w-full theme-input border theme-border p-2 rounded outline-none"
            />

            <select
              value={taskStatus}
              onChange={(event) => setTaskStatus(event.target.value)}
              className="w-full theme-input border theme-border p-2 rounded"
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="theme-toggle-btn px-4 py-1 rounded"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={createTask}
                className="px-4 py-1 bg-blue-600 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
