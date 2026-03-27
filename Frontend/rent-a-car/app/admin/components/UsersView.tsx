import React from "react";
import { FaUsers } from "react-icons/fa";

export default function UsersView() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-4">Kullanıcı Listesi</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-3xl text-gray-400 mb-4">
                    <FaUsers />
                </div>
                <p className="text-gray-500">Kullanıcı yönetimi modülü yapım aşamasında.</p>
            </div>
        </div>
    );
}