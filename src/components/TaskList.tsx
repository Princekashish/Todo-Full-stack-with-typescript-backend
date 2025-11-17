// src/components/TaskList.tsx
import React, { useState } from 'react';
import type { Task } from '../types';
import type { Dispatch, SetStateAction } from 'react';
import { ChevronRight } from 'lucide-react';

type Props = {
    tasks: Task[];
    onOpenTask: Dispatch<SetStateAction<Task | null>>;
    selectedNav: string;
};

const TaskList: React.FC<Props> = ({ tasks = [], onOpenTask, selectedNav = '' }) => {
    const [input, setInput] = useState("")
    const [todolist, setTodolist] = useState(tasks);
    const add = () => {
        const newTask: Task = {
            id: "1",
            title: input,
            list: "Today"
        }
        setTodolist([...tasks, newTask])
        setInput(" ")
    }

console.log(todolist);


    return (
        <div className="flex-1 px-8 py-8">
            <div className="flex items-center gap-4">
                <h1 className="text-4xl font-extrabold">{selectedNav}</h1>
                <div className="px-3 py-1 border rounded-md text-gray-600">{todolist.length}</div>
            </div>

            <div className="mt-6">
                <div className="p-3 ">
                    <div className="px-4 py-2 border-b flex items-center gap-1 border-gray-200 border rounded-xl ">
                        <button className="text-gray-500 text-lg" type="button">
                            +
                        </button>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 px-3 py-2 text-sm outline-none"
                            placeholder="Add New Task"
                            aria-label="Add new task"
                            onKeyDown={(e) => {
                                if (e.key === "Enter")
                                    add()
                            }}
                        />
                    </div>

                    <ul>
                        {tasks.map((t) => (
                            <li
                                key={t.id}
                                className="px-4 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 cursor-pointer border-b border-gray-200"
                                onClick={() => onOpenTask(t)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') onOpenTask(t);
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <input type="checkbox" aria-label={`Complete ${t.title}`} />
                                    <div>
                                        <div className="font-medium">{t.title}</div>
                                        <div className="text-sm text-gray-400">{t.description}</div>
                                        <div className="mt-2 flex items-center gap-2">
                                            {t.due && <span className="text-xs px-2 py-1 rounded bg-gray-100">{t.due}</span>}
                                            {t.subtasks && t.subtasks.length > 0 && (
                                                <span className="text-xs px-2 py-1 rounded bg-gray-100">{t.subtasks.length} Subtasks</span>
                                            )}
                                            {t.tags?.map((tag) => (
                                                <span key={tag} className="text-xs px-2 py-1 rounded bg-amber-100">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-gray-400 flex ">
                                    <ChevronRight color='black' />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
