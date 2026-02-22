export default function TimelineView() {

  const tasks = [
    { id: 1, title: "Design Login UI", start: "2026-02-01", end: "2026-02-05" },
    { id: 2, title: "Setup Database", start: "2026-02-03", end: "2026-02-08" },
    { id: 3, title: "Build API", start: "2026-02-06", end: "2026-02-12" },
    { id: 4, title: "Testing", start: "2026-02-10", end: "2026-02-15" }
  ];

  const projectStart = new Date("2026-02-01");

  const daysBetween = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    return (e - s) / (1000 * 60 * 60 * 24);
  };

  const offsetFromStart = (start) => {
    const s = new Date(start);
    return (s - projectStart) / (1000 * 60 * 60 * 24);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-[#151821] p-6 rounded-xl w-full max-w-6xl">
        <h3 className="text-lg mb-6 font-semibold">Timeline</h3>

        <div className="space-y-4">
          {tasks.map(task => {

            const width = daysBetween(task.start, task.end) * 30;
            const marginLeft = offsetFromStart(task.start) * 30;

            return (
              <div key={task.id}>
                <div className="text-sm mb-1">{task.title}</div>

                <div className="bg-gray-800 h-6 rounded relative">
                  <div
                    className="absolute h-6 bg-blue-600 rounded"
                    style={{
                      width: `${width}px`,
                      marginLeft: `${marginLeft}px`
                    }}
                  />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}