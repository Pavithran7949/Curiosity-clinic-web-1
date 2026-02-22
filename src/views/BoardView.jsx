import { useState } from "react";
import BoardColumn from "../components/BoardColumn";

export default function BoardView() {

  
  
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design Login UI", status: "todo" },
    { id: 2, title: "Setup Database", status: "todo" },
    { id: 3, title: "Build API", status: "inprogress" },
    { id: 4, title: "Project Setup", status: "done" }
  ]);

const [showModal, setShowModal] = useState(false);
const [taskTitle, setTaskTitle] = useState("");
const [taskStatus, setTaskStatus] = useState("todo");

const createTask = () => {
  if (!taskTitle.trim()) return;

  setTasks(prev => [
    ...prev,
    {
      id: Date.now(),
      title: taskTitle,
      status: taskStatus
    }
  ]);

  setTaskTitle("");
  setTaskStatus("todo");
  setShowModal(false);
};

  const [columnInputs, setColumnInputs] = useState({
  todo: "",
  inprogress: "",
  done: ""
});

 const addTask = (status) => {
  const title = columnInputs[status];
  if (!title.trim()) return;

  setTasks(prev => [
    ...prev,
    {
      id: Date.now(),
      title,
      status
    }
  ]);

  setColumnInputs(prev => ({
    ...prev,
    [status]: ""
  }));
};

  const columns = {
    todo: tasks.filter(t => t.status === "todo"),
    inprogress: tasks.filter(t => t.status === "inprogress"),
    done: tasks.filter(t => t.status === "done")
  };

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const onDrop = (e, newStatus) => {
    const taskId = parseInt(e.dataTransfer.getData("taskId"));

    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  };



<div className="flex justify-between items-center mb-4">
  <h2 className="text-lg font-semibold">Board</h2>

  <button
    onClick={() => setShowModal(true)}
    className="bg-blue-600 px-4 py-2 rounded text-sm"
  >
    + Add Task
  </button>
</div>

return (
  <div className="w-full h-full flex flex-col">

    {/* TOP BAR */}
    <div className="flex justify-end mb-4">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 px-4 py-2 rounded text-sm"
      >
        + Add Task
      </button>
    </div>

    {/* BOARD */}
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

    {/* MODAL */}
    {showModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

        <div className="bg-[#151821] p-6 rounded-lg w-96 space-y-4">

          <h3 className="text-lg font-semibold">Add New Task</h3>

          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task name"
            className="w-full bg-[#1c1f2a] p-2 rounded outline-none"
          />

          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            className="w-full bg-[#1c1f2a] p-2 rounded"
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-1 bg-gray-600 rounded"
            >
              Cancel
            </button>

            <button
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