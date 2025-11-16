
import { LogOut, LogOutIcon } from 'lucide-react';
import React from 'react';

type Props = {
    selected: string;
    onSelect: (name: string) => void;
    counts?: Record<string, number>;
};

const NAV_ITEMS = [
    { id: 'today', label: 'Today' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'personal', label: 'Personal' },
    { id: 'work', label: 'Work' },
];

export const SideNav: React.FC<Props> = ({ selected, onSelect, counts = {} }) => {
    return (
        <aside className="w-72 bg-[#F4F4F4] m-5 rounded-xl border-r border-gray-100 p-6 sticky top-0  ">
            <div className="mb-6">
                <div className="text-2xl font-extrabold">Menu</div>
            </div>

            <div className="mb-6">
                <input
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400"
                    placeholder="Search"
                />
            </div>

            <nav className="space-y-2">
                <div className="text-xs text-black font-semibold">TASKS</div>
                {NAV_ITEMS.slice(0, 2).map((n) => (
                    <button
                        key={n.id}
                        onClick={() => onSelect(n.label)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-left hover:bg-gray-50 transition ${selected === n.label ? 'bg-gray-100 font-semibold' : ''
                            }`}
                        type="button"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm bg-gray-300" />
                            {n.label}
                        </span>
                        <span className="text-sm text-gray-500">{counts[n.label] || 0}</span>
                    </button>
                ))}

                <div className="mt-6 text-xs text-black font-semibold">LISTS</div>
                {NAV_ITEMS.slice(2).map((n) => (
                    <button
                        key={n.id}
                        onClick={() => onSelect(n.label)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-left hover:bg-gray-50 transition ${selected === n.label ? 'bg-gray-100 font-semibold' : ''
                            }`}
                        type="button"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm bg-amber-300" />
                            {n.label}
                        </span>
                        <span className="text-sm text-gray-500">{counts[n.label] || 0}</span>
                    </button>
                ))}

                <div className="mt-6">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50" type="button">
                        <span className="text-lg">+</span> Add New List
                    </button>
                </div>

                <div className="mt-6 text-xs text-black">TAGS</div>
                <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 rounded-md bg-sky-100 text-sm">Tag 1</span>
                    <span className="px-3 py-1 rounded-md bg-rose-100 text-sm">Tag 2</span>
                    <button className="px-3 py-1 rounded-md border text-sm" type="button">
                        + Add Tag 
                    </button>
                </div>

                <div className="mt-10 absolute bottom-5">
                    <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex justify-start items-center gap-2" type="button">
                      <LogOutIcon size={20}/>  Sign out
                    </button>
                </div>
            </nav>
        </aside>
    );
};

export default SideNav;
