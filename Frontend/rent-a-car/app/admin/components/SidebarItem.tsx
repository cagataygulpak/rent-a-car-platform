import React from "react";

interface SidebarItemProps {
    icon: React.ReactNode;
    text: string;
    active: boolean;
    onClick: () => void;
}

export default function SidebarItem({ icon, text, active, onClick }: SidebarItemProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition duration-200 ${active
                    ? "bg-blue-600 text-white shadow-blue-500/30 shadow-lg"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
        >
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{text}</span>
        </button>
    );
}