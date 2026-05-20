import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { Todo } from '@/types';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const priorityStyles: Record<string, string> = {
  low: 'bg-green-500/10 border-green-500/30 text-green-400',
  medium: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  high: 'bg-red-500/10 border-red-500/30 text-red-400',
};

const priorityDot: Record<string, string> = {
  low: 'bg-green-400',
  medium: 'bg-yellow-400',
  high: 'bg-red-400',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleSave() {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <li
      className={clsx(
        'group flex items-center gap-3 bg-[#1e1e2e] border rounded-2xl px-4 py-3 transition',
        todo.completed ? 'border-white/5 opacity-60' : 'border-white/5 hover:border-indigo-500/30'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-slate-600 hover:border-indigo-400'
        )}
      >
        {todo.completed && <Check size={11} className="text-white" strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-[#2a2a3e] text-white rounded-lg px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ) : (
          <div>
            <p
              className={clsx(
                'text-sm truncate',
                todo.completed ? 'line-through text-slate-500' : 'text-white'
              )}
            >
              {todo.text}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-slate-500">{todo.category}</span>
              <span
                className={clsx(
                  'inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border',
                  priorityStyles[todo.priority]
                )}
              >
                <span className={clsx('w-1.5 h-1.5 rounded-full', priorityDot[todo.priority])} />
                {todo.priority}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div
        className={clsx(
          'flex items-center gap-1 transition',
          editing ? 'flex' : 'opacity-0 group-hover:opacity-100'
        )}
      >
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-green-400 hover:bg-green-400/10 transition"
            >
              <Check size={15} />
            </button>
            <button
              onClick={() => {
                setEditText(todo.text);
                setEditing(false);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-white/5 transition"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
