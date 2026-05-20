import { Search, Trash2 } from 'lucide-react';
import { Filter } from '@/types';
import clsx from 'clsx';

type TodoFiltersProps = {
  filter: Filter;
  setFilter: (f: Filter) => void;
  search: string;
  setSearch: (s: string) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  categories: string[];
  completedCount: number;
  onClearCompleted: () => void;
};

const filterTabs: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFilters({
  filter,
  setFilter,
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  categories,
  completedCount,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <div className="mb-4 space-y-3">
      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full bg-[#1e1e2e] border border-white/5 text-white placeholder-slate-500 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Filter tabs + clear */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-[#1e1e2e] p-1 rounded-xl border border-white/5">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={clsx(
                'px-4 py-1.5 rounded-lg text-xs font-medium transition',
                filter === tab.value
                  ? 'bg-indigo-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition"
          >
            <Trash2 size={13} />
            Clear {completedCount} completed
          </button>
        )}
      </div>

      {/* Category filter */}
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={clsx(
                'px-3 py-1 rounded-full text-xs font-medium border transition',
                categoryFilter === cat
                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                  : 'border-white/10 text-slate-400 hover:border-white/30'
              )}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
