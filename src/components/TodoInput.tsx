import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Priority } from '@/types';
import clsx from 'clsx';

type TodoInputProps = {
  onAdd: (text: string, priority: Priority, category: string) => void;
};

const priorityOptions: { label: string; value: Priority; color: string }[] = [
  { label: 'Low', value: 'low', color: 'text-green-400' },
  { label: 'Medium', value: 'medium', color: 'text-yellow-400' },
  { label: 'High', value: 'high', color: 'text-red-400' },
];

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');
  const [expanded, setExpanded] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category);
    setText('');
    setCategory('');
    setPriority('medium');
    setExpanded(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1e1e2e] rounded-2xl p-4 mb-4 shadow-lg border border-white/5"
    >
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setExpanded(true)}
          placeholder="Add a new task..."
          className="flex-1 bg-[#2a2a3e] text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl p-3 transition flex items-center justify-center"
        >
          <Plus size={20} />
        </button>
      </div>

      {expanded && (
        <div className="mt-3 flex flex-wrap gap-3">
          {/* Priority */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Priority:</span>
            <div className="flex gap-1">
              {priorityOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPriority(opt.value)}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-medium border transition',
                    priority === opt.value
                      ? 'border-indigo-500 bg-indigo-500/20 text-white'
                      : 'border-white/10 bg-transparent text-slate-400 hover:border-white/30'
                  )}
                >
                  <span className={opt.color}>●</span> {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Category:</span>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Work, Personal"
              className="bg-[#2a2a3e] text-white placeholder-slate-500 rounded-lg px-3 py-1 text-xs outline-none focus:ring-1 focus:ring-indigo-500 transition w-36"
            />
          </div>
        </div>
      )}
    </form>
  );
}
