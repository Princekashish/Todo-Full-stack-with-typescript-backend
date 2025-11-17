import { LogOut as LogOutIcon } from 'lucide-react';
import React from 'react';
import { SAMPLE_TASKS } from '../tasks';

type Props = {
    selected: string;
    onSelect: (name: string) => void;
    counts?: Record<string, number>;
    tagCounts?: Record<string, number>;
};

const SideNav: React.FC<Props> = ({ selected, onSelect, counts = {},tagCounts }) => {
    const uniqueTaskLists = [...new Set(SAMPLE_TASKS.map((t) => t.list))];

    // unique tags across tasks (safe-guard tags possibly undefined)
    const uniqueTags = [...new Set(SAMPLE_TASKS.flatMap((task) => task.tags ?? []))];

    return (
        <aside className="w-72 bg-[#F4F4F4] m-5 rounded-xl p-6 sticky top-0">
            <div className="mb-6">
                <div className="text-2xl font-extrabold">Menu</div>
            </div>

            <div className="mb-6">
                <input
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400"
                    placeholder="Search"
                    type="search"
                    aria-label="Search tasks"
                />
            </div>

            <nav className="space-y-4">
                <div className="text-xs text-black font-semibold">TASKS</div>

                {uniqueTaskLists.map((listName) => (
                    <button
                        key={listName}
                        onClick={() => onSelect(listName)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-left hover:bg-gray-50 transition ${selected === listName ? 'bg-gray-100 font-semibold' : ''
                            }`}
                        type="button"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm bg-gray-300" />
                            {listName}
                        </span>

                        <span className="text-sm text-gray-500">{counts[listName] ?? 0}</span>
                    </button>
                ))}

                <div className="mt-4 text-xs text-black font-semibold">LISTS</div>

                {uniqueTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => onSelect(tag)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-left hover:bg-gray-50 transition ${selected === tag ? 'bg-gray-100 font-semibold' : ''
                            }`}
                        type="button"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm bg-amber-300" />
                            {tag}
                        </span>
                        <span className="text-sm text-gray-500">{tagCounts?.[tag] ?? 0}</span>
                    </button>
                ))}

                <div className="mt-4">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50" type="button">
                        <span className="text-lg">+</span> Add New List
                    </button>
                </div>

                <div className="mt-4 text-xs text-black">TAGS</div>
                <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 rounded-md bg-sky-100 text-sm">Tag 1</span>
                    <span className="px-3 py-1 rounded-md bg-rose-100 text-sm">Tag 2</span>
                    <button className="px-3 py-1 rounded-md border text-sm" type="button">
                        + Add Tag
                    </button>
                </div>

                <div className="mt-6 absolute bottom-5 rounded-xl bg-black/20 text-black">
                    <button
                        className="w-full text-left px-3 py-2 rounded-md  flex justify-start items-center gap-2"
                        type="button"
                    >
                        <LogOutIcon size={18} /> Sign out
                    </button>
                </div>
            </nav>
        </aside>
    );
};

export default SideNav;
