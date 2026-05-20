type TodoStatsProps = {
  activeCount: number;
  completedCount: number;
  totalCount: number;
};

export default function TodoStats({ activeCount, completedCount, totalCount }: TodoStatsProps) {
  const pct = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-[#1e1e2e] border border-white/5 rounded-2xl p-4 text-center">
        <p className="text-2xl font-bold text-white">{totalCount}</p>
        <p className="text-xs text-slate-400 mt-0.5">Total</p>
      </div>
      <div className="bg-[#1e1e2e] border border-white/5 rounded-2xl p-4 text-center">
        <p className="text-2xl font-bold text-indigo-400">{activeCount}</p>
        <p className="text-xs text-slate-400 mt-0.5">Active</p>
      </div>
      <div className="bg-[#1e1e2e] border border-white/5 rounded-2xl p-4 text-center">
        <p className="text-2xl font-bold text-green-400">{completedCount}</p>
        <p className="text-xs text-slate-400 mt-0.5">Done</p>
      </div>

      {totalCount > 0 && (
        <div className="col-span-3 bg-[#1e1e2e] border border-white/5 rounded-2xl px-4 py-3">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Progress</span>
            <span>{pct}%</span>
          </div>
          <div className="w-full h-2 bg-[#2a2a3e] rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
