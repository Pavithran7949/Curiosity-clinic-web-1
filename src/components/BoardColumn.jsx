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
      className="theme-surface border theme-border rounded-lg p-4 flex-1 min-h-[300px]"
    >
      <h3 className="mb-4 text-sm font-semibold theme-muted">{title}</h3>

      <div className="space-y-3">
        {(tasks || []).map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
            className="theme-surface-alt border theme-border p-3 rounded cursor-move theme-card-hover"
          >
            {task.title}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={columnInputs[status]}
          onChange={(e) =>
            setColumnInputs((prev) => ({
              ...prev,
              [status]: e.target.value,
            }))
          }
          placeholder="New task..."
          className="flex-1 theme-input border theme-border p-2 rounded text-sm outline-none"
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
