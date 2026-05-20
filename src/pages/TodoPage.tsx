import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFilters from '@/components/TodoFilters';
import TodoStats from '@/components/TodoStats';

export default function TodoPage() {
  const store = useTodos();

  return (
    <div className="min-h-screen bg-[#13131f] flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-1">
            My Todos
          </h1>
          <p className="text-slate-400 text-sm">Stay organised, get things done.</p>
        </div>

        {/* Stats */}
        <TodoStats
          activeCount={store.activeCount}
          completedCount={store.completedCount}
          totalCount={store.allTodos.length}
        />

        {/* Input */}
        <TodoInput onAdd={store.addTodo} />

        {/* Filters */}
        <TodoFilters
          filter={store.filter}
          setFilter={store.setFilter}
          search={store.search}
          setSearch={store.setSearch}
          categoryFilter={store.categoryFilter}
          setCategoryFilter={store.setCategoryFilter}
          categories={store.categories}
          completedCount={store.completedCount}
          onClearCompleted={store.clearCompleted}
        />

        {/* List */}
        <TodoList
          todos={store.todos}
          onToggle={store.toggleTodo}
          onDelete={store.deleteTodo}
          onEdit={store.editTodo}
        />
      </div>
    </div>
  );
}
