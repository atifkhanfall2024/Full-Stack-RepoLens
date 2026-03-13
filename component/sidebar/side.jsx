export default function Sidebar() {
  return (
    <div className="w-[250px] h-screen bg-white border-r flex flex-col justify-between fixed">
      
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b">
          <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-md font-semibold">
            RM
          </div>
          <span className="text-lg text-black font-semibold">RepoMind</span>
        </div>

        {/* Navigation */}
        <div className="mt-6 px-3">
          <p className="text-xs text-black font-semibold px-3 mb-2">
            NAVIGATION
          </p>

          <div className="flex flex-col text-black gap-1">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-100 text-gray-900 font-medium">
              <span>📊</span>
              Dashboard
            </button>

            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-black">
              <span>📁</span>
              My Repos
            </button>

            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-black">
              <span>⚙️</span>
              Settings
            </button>
          </div>
        </div>

        {/* Active Context */}
        <div className="mt-8 px-3">
          <p className="text-xs text-black font-semibold px-3 mb-2">
            ACTIVE CONTEXT
          </p>

          <div className="flex items-center justify-between bg-blue-50 text-blue-600 px-3 py-2 rounded-lg">
            <span className="text-sm text-black font-medium">acme-corp/frontend</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Recent Repos */}
        <div className="mt-8 px-3">
          <p className="text-xs text-black font-semibold px-3 mb-2">
            RECENT REPOS
          </p>

          <div className="flex flex-col gap-2 text-sm text-black">
            <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-lg">
              <span>repo-mind/api</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>

            <div className="flex items-center text-black px-3 py-2 hover:bg-gray-100 rounded-lg">
              stripe-payments-demo
            </div>
          </div>
        </div>
      </div>

      {/* Bottom User */}
      <div className="border-t px-5 py-4 text-black flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          className="w-9 h-9 rounded-full"
        />

        <div className="flex flex-col text-black text-sm">
          <span className="font-medium text-black">Alex Dev</span>
          <span className="text-balck text-xs">Pro Plan</span>
        </div>
      </div>

    </div>
  );
}