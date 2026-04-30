"use client";
import React from "react";
import { FaPlus, FaTrash, FaEdit, FaUserTag, FaList, FaUserShield } from "react-icons/fa";
import { useRoles } from "../../hooks/useRoles"; // 👈 BEYNİ (HOOK) İÇERİ ALDIK

export default function RolesView() {
    // Beyindeki tüm fonksiyonları ve değişkenleri tek satırda çekiyoruz
    const {
        roles, users, loading,
        newRoleName, setNewRoleName,
        selectedRoleUpdate, setSelectedRoleUpdate,
        updateRoleName, setUpdateRoleName,
        selectedRoleDelete, setSelectedRoleDelete,
        assignUserId, handleUserSelect,
        assignRoleName, setAssignRoleName,
        handleCreate, handleUpdate, handleDelete, handleAssign
    } = useRoles();

    // Eğer yükleniyorsa sadece yazıyı göster, aşağıya inme
    if (loading) return <div className="p-10 text-center text-gray-500 font-medium">Sistem Yükleniyor...</div>;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4 mb-6">Rol Yönetim Merkezi</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Mevcut Roller */}
                <div className="bg-white p-6 rounded-xl shadow-sm border overflow-y-auto border-gray-200 flex flex-col h-60">
                    <div className="flex items-center gap-2 mb-4 text-purple-600 font-bold border-b pb-2">
                        <FaList /> <span>Mevcut Roller</span>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-50 space-y-2 pr-2 custom-scrollbar">
                        {roles.length === 0 ? (
                            <p className="text-sm text-gray-400 italic">Hiç rol yok.</p>
                        ) : (
                            roles.map((role, index) => (
                                <div
                                    key={role.id}
                                    className="flex items-center justify-between p-2 bg-gray-50 rounded border text-black border-gray-100 text-sm hover:bg-purple-50 transition">
                                    <span className="font-semibold text-gray-700">{index + 1}. {role.name}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Yeni Rol Ekle */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2 mb-4 text-green-600 font-bold border-b pb-2">
                        <FaPlus /> <span>Yeni Rol Ekle</span>
                    </div>
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Örn: Editor"
                            value={newRoleName}
                            onChange={(e) => setNewRoleName(e.target.value)}
                            className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm" />
                        <button
                            onClick={handleCreate}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition text-sm cursor-pointer">Oluştur</button>
                    </div>
                </div>

                {/* Rol Güncelle */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold border-b pb-2">
                        <FaEdit /> <span>Rol Güncelle</span>
                    </div>
                    <div className="space-y-3">
                        <select
                            className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 outline-none text-sm"
                            onChange={(e) => setSelectedRoleUpdate(e.target.value)}
                            value={selectedRoleUpdate}>
                            <option value="">Seçiniz...</option>
                            {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                        <input
                            type="text"
                            placeholder="Yeni Adı Girin"
                            value={updateRoleName}
                            onChange={(e) => setUpdateRoleName(e.target.value)}
                            className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                        <button
                            onClick={handleUpdate}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition text-sm cursor-pointer">Güncelle</button>
                    </div>
                </div>

                {/* Rol Sil */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2 mb-4 text-red-600 font-bold border-b pb-2">
                        <FaTrash /> <span>Rol Sil</span>
                    </div>
                    <div className="space-y-3">
                        <select className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 outline-none text-sm"
                            onChange={(e) => setSelectedRoleDelete(e.target.value)}
                            value={selectedRoleDelete}>
                            <option value="">Seçiniz...</option>
                            {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                        <div className="h-10.5"></div>
                        <button
                            onClick={handleDelete}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition text-sm cursor-pointer">Sil</button>
                    </div>
                </div>
            </div>

            {/* --- 2. SATIR: ROL ATAMA --- */}
            <div className="bg-linear-to-r from-slate-800 to-slate-900 rounded-xl p-8 shadow-lg text-white">
                <div className="flex items-center gap-3 mb-6 text-xl font-bold border-b border-slate-600 pb-4">
                    <FaUserTag className="text-yellow-400" />
                    <h3>Kullanıcıya Rol Ata</h3>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm text-gray-300 mb-2">Kullanıcı Seç</label>
                        <select
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 outline-none focus:border-yellow-400 text-white"
                            onChange={handleUserSelect}
                            value={assignUserId}>
                            <option value="">Bir kullanıcı seçin...</option>
                            {users.map(u => <option key={u.id} value={u.id}>{u.userName} ({u.email})</option>)}
                        </select>
                    </div>

                    <div className="flex-1 w-full">
                        <label className="block text-sm text-gray-300 mb-2">Atanacak Rol</label>
                        <select
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 outline-none focus:border-yellow-400 text-white"
                            onChange={(e) => setAssignRoleName(e.target.value)}
                            value={assignRoleName}>
                            <option value="">Rol seçin...</option>
                            {roles.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                        </select>
                    </div>

                    <button
                        onClick={handleAssign}
                        className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold px-8 py-3 rounded-lg transition shadow-lg shadow-yellow-500/20 cursor-pointer">
                        Yetkiyi Ver
                    </button>
                </div>
            </div>

            {/* --- 3. SATIR: KULLANICI & ROL LİSTESİ --- */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                    <FaUserShield className="text-2xl text-indigo-600" />
                    <h3 className="text-lg font-bold text-gray-800">Kullanıcı Rol Dağılımı</h3>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4">Kullanıcı Adı</th>
                            <th className="px-6 py-4">E-Posta</th>
                            <th className="px-6 py-4">Atanmış Roller</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-700">{user.userName}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{user.email}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {user.roles && user.roles.length > 0 ? (
                                            user.roles.map((role, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`px-3 py-1 rounded-full text-xs font-bold border ${role === "Admin" ? "bg-red-100 text-red-700 border-red-200" : "bg-blue-100 text-blue-700 border-blue-200"}`}>
                                                    {role}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">Rol Yok</span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}