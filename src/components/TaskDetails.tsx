// src/components/TaskDetails.tsx
import React from 'react';
import type { Task } from '../types';
type Props = {
    task?: Task | null;
    onClose?: () => void;
};

const TaskDetails: React.FC<Props> = ({ task = null, onClose = () => { } }) => {
    if (!task) return null;

    return (
        <div className="w-96 bg-[#F4F4F4] m-4 p-6  sticky top-0 rounded-xl">
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-lg font-bold">Task:</div>
                    <div className="text-sm text-gray-500 mt-2">{task.title}</div>
                </div>
                <button onClick={onClose} className="text-gray-500" type="button">
                    ✕
                </button>
            </div>

            <div className="mt-6">
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea
                    defaultValue={task.description ?? ''}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 h-24"
                    aria-label="task description"
                />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                    <div className="mb-1">List</div>
                    <div className="px-3 py-2 border border-gray-200 rounded">{task.list}</div>
                </div>
                <div>
                    <div className="mb-1">Due date</div>
                    <div className="px-3 py-2 border border-gray-200 rounded">{task.due ?? '—'}</div>
                </div>
            </div>

            <div className="mt-6">
                <div className="mb-2 text-sm font-semibold">Tags</div>
                <div className="flex gap-2">
                    {(task.tags || []).map((t) => (
                        <span key={t} className="px-3 py-1 rounded bg-sky-100 text-sm">
                            {t}
                        </span>
                    ))}
                    <button className="px-3 py-1 border border-gray-200 rounded text-sm" type="button">
                        + Add Tag
                    </button>
                </div>
            </div>

            <div className="mt-6">
                <div className="text-lg font-bold mb-2">Subtasks:</div>
                <button className="flex items-center gap-2 text-sm mb-2" type="button">
                    + Add New Subtask
                </button>
                <ul className="space-y-2">
                    {(task.subtasks || []).map((s) => (
                        <li key={s.id} className="flex items-center gap-3">
                            <input type="checkbox" checked={!!s.done} readOnly />
                            <div>{s.text}</div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-10 flex gap-4">
                <button className="flex-1  rounded-xl px-4 py-2 bg-red-500 text-white duration-300" type="button">
                    Delete Task
                </button>
                <button className="flex-1 rounded-xl px-4 py-2 bg-[#ffeb9a] text-black" type="button">
                    Save changes
                </button>
            </div>
        </div>
    );
};

export default TaskDetails;
