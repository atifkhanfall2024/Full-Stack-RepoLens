export default function InsightsSidebar() {
  return (
    <div className="w-[320px] h-screen border-l bg-white p-6 flex flex-col gap-6">

      {/* Header Tabs */}
      <div className="flex gap-6 border-b pb-3">
        <p className="font-semibold text-gray-900 border-b-2 border-black pb-2">
          Insights
        </p>
        <p className="text-gray-500">File Tree</p>
      </div>

      {/* Repository Stats */}
      <div>
        <p className="text-xs text-black font-semibold mb-3 tracking-wider">
          REPOSITORY STATUS
        </p>

        <div className="flex gap-3">
          <div className="flex-1 border rounded-lg p-3">
            <p className="text-gray-400 text-xs">Total Files</p>
            <p className="text-lg font-semibold text-gray-900">142</p>
          </div>

          <div className="flex-1 border rounded-lg p-3">
            <p className="text-gray-400 text-xs">Lines of Code</p>
            <p className="text-lg font-semibold text-gray-900">12.4k</p>
          </div>
        </div>
      </div>

      {/* AI Understanding */}
      <div>
        <div className="flex justify-between mb-2">
          <p className="text-xs text-black font-semibold tracking-wider">
            AI UNDERSTANDING
          </p>
          <p className="text-green-600 text-sm font-medium">92%</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full w-[92%]"></div>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          High confidence in React components and routing logic.
        </p>
      </div>

      {/* Architecture */}
      <div>
        <div className="flex justify-between mb-3">
          <p className="text-xs text-black font-semibold tracking-wider">
            ARCHITECTURE
          </p>

          <button className="text-blue-500 text-xs font-medium">
            Expand
          </button>
        </div>

        {/* Diagram Box */}
        <div className="border rounded-xl h-[160px] flex flex-col items-center justify-center text-gray-400">
          <div className="w-10 h-10 rounded-full border"></div>

          <p className="text-sm mt-3">Data Flow Diagram</p>
          <p className="text-xs text-gray-400">
            Visualizing component relationships...
          </p>
        </div>
      </div>

    </div>
  );
}