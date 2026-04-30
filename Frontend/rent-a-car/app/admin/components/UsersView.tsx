// E:\React_ve_Net_Core_Projeleri\rent-a-car-site\Frontend\rent-a-car\app\admin\components\UsersView.tsx

"use client";
import React from "react";
import { FaUserShield, FaEnvelope, FaIdCard, FaUsers } from "react-icons/fa";
import { useRoles } from "../../hooks/useRoles";

export default function UsersView() {
    // Halihazırda yazdığın useRoles hook'u zaten tüm kullanıcıları ve rollerini çekiyor.
    const { users, loading } = useRoles();

    if (loading) {
        return (
            <div className="p-10 text-center text-black font-bold animate-pulse">
                Kullanıcı listesi hazırlanıyor... 👤
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <h2 className="text-2xl font-black text-black border-l-4 border-blue-600 pl-4 mb-6">
                Kullanıcı ve Yetki Listesi
            </h2>

            <div className="bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-center gap-3">
                    <FaUsers className="text-2xl text-blue-600" />
                    <h3 className="text-lg font-black text-black">Sistemdeki Tüm Kullanıcılar</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-200 text-black text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-black border-b border-gray-300">
                                    <div className="flex items-center gap-2">
                                        <FaIdCard /> Kullanıcı Adı
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-black border-b border-gray-300">
                                    <div className="flex items-center gap-2">
                                        <FaEnvelope /> E-Posta
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-black border-b border-gray-300 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <FaUserShield /> Atanmış Roller
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-black">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center font-bold italic text-black">
                                        Henüz bir kullanıcı kaydı bulunamadı.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-blue-50 transition duration-150">
                                        <td className="px-6 py-4">
                                            <div className="font-black text-lg">{user.userName}</div>
                                            <div className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">
                                                UID: {user.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-md">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap justify-center gap-2">
                                                {user.roles && user.roles.length > 0 ? (
                                                    user.roles.map((role, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={`px-4 py-1 rounded-full text-xs font-black border shadow-sm ${role === "Admin"
                                                                    ? "bg-red-100 text-red-700 border-red-300"
                                                                    : "bg-blue-100 text-blue-700 border-blue-300"
                                                                }`}
                                                        >
                                                            {role.toUpperCase()}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="px-4 py-1 rounded-full text-xs font-black bg-gray-100 text-black border border-dashed border-gray-400">
                                                        ROL TANIMSIZ
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-black text-sm font-bold text-center">
                    💡 İpucu: Kullanıcıların rollerini değiştirmek için <strong>Rol İşlemleri</strong> menüsünü kullanabilirsiniz.
                </p>
            </div>
        </div>
    );
}