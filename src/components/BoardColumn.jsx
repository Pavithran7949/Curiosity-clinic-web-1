export default function BoardColumn({
  title,
  status,
  tasks,
  columnInputs,
  setColumnInputs,
  addTask,
  onDragStart,
  onDrop
}) {

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, status)}
      className="bg-[#151821] rounded-lg p-4 flex-1 min-h-[300px]"
    >
      <h3 className="mb-4 text-sm font-semibold text-gray-400">{title}</h3>

      <div className="space-y-3">
        {(tasks || []).map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
            className="bg-[#1c1f2a] p-3 rounded cursor-move hover:bg-[#262a36]"
          >
            {task.title}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={columnInputs[status]}
          onChange={(e) =>
            setColumnInputs(prev => ({
              ...prev,
              [status]: e.target.value
            }))
          }
          placeholder="New task..."
          className="flex-1 bg-[#1c1f2a] p-2 rounded text-sm outline-none"
        />
        <button
          onClick={() => addTask(status)}
          className="bg-blue-600 px-3 rounded text-sm"
        >
          +
        </button>
      </div>

    </div>
  );
}