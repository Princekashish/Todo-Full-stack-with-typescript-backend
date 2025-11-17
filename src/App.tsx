import { useMemo, useState } from 'react';
import type { Task } from './types';
import SideNav from './components/SideNav';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import { SAMPLE_TASKS } from './tasks';

export default function App() {
  const [tasks] = useState<Task[]>(SAMPLE_TASKS);
  const [selectedNav, setSelectedNav] = useState<string>('Today');
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const counts = useMemo<Record<string, number>>(() => {
    const c: Record<string, number> = {};
    tasks.forEach((t) => {
      c[t.list] = (c[t.list] || 0) + 1;
    });
    return c;
  }, [tasks]);
  const tagCounts = useMemo<Record<string, number>>(() => {
    const c: Record<string, number> = {};
    tasks.forEach((t) => {
      t.tags?.forEach((tag) => {
        // console.log(c[tag]);
        c[tag] = (c[tag] || 0) + 1;
      })
    });
    console.log(c);
    return c;

  }, [tasks]);



  const filtered = useMemo(() => {
    if (selectedNav === 'Today') return tasks.filter((t) => t.list === 'Today');
    if (selectedNav === 'Upcoming') return tasks.filter((t) => t.list === 'Upcoming');
    return tasks.filter((t) => t.tags?.includes(selectedNav) || t.list === selectedNav);
  }, [tasks, selectedNav]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 flex">
      <SideNav selected={selectedNav} onSelect={setSelectedNav} counts={counts} tagCounts={tagCounts} />

      <main className="flex-1 flex">
        <TaskList tasks={filtered} onOpenTask={setActiveTask} selectedNav={selectedNav} />

        <TaskDetails task={activeTask} onClose={() => setActiveTask(null)} />
      </main>
    </div>
  );
}
