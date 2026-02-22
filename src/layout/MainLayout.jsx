export default function MainLayout({ children }) {
  return (
    <div className="h-screen w-screen flex bg-[#0f1117] text-gray-200">

      {/* Sidebar */}
      <aside className="w-64 bg-[#151821] border-r border-gray-800 flex flex-col">

        <div className="p-4 border-b border-gray-800 text-lg font-bold">
          WorkManager
        </div>

        <div className="p-3 space-y-2 text-sm">
          <div className="hover:bg-gray-800 p-2 rounded cursor-pointer">
            Home
          </div>

          <div className="hover:bg-gray-800 p-2 rounded cursor-pointer">
            My Tasks
          </div>
        </div>

      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full">

        {/* Topbar */}
        <header className="h-14 border-b border-gray-800 flex items-center px-6">
          <input
            className="bg-[#1c1f2a] px-4 py-1 rounded w-96 outline-none"
            placeholder="Search"
          />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>

      </div>

    </div>
  );
}