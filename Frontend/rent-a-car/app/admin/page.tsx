"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaHome, FaCar, FaUsers, FaUserShield, FaSignOutAlt } from "react-icons/fa";
// 👇 PARÇALADIĞIMIZ BİLEŞENLERİ ÇAĞIRIYORUZ
import SidebarItem from "./components/SidebarItem";
import DashboardView from "./components/DashboardView";
import CarsView from "./components/CarsView";
import UsersView from "./components/UsersView";
import RolesView from "./components/RolesView";

export default function AdminLayout() {
    const { user, logout, loading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("dashboard");

    // Menü Listesi (Döngü ile basmak için)
    const menuItems = [
        { id: "dashboard", label: "Genel Durum", icon: <FaHome /> },
        { id: "cars", label: "Araç Yönetimi", icon: <FaCar /> },
        { id: "users", label: "Kullanıcılar", icon: <FaUsers /> },
        { id: "roles", label: "Rol İşlemleri", icon: <FaUserShield /> },
    ];

    // GÜVENLİK KONTROLÜ
    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== "Admin") {
                toast.error("Yetkisiz Giriş!");
                router.push("/");
            }
        }
    }, [user, loading, router]);

    if (loading || !user || user.role !== "Admin") return null;

    return (
        <div className="flex h-screen w-full overflow-hidden bg-gray-100 font-sans">

            {/* --- SOL MENÜ (SIDEBAR) --- */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 h-full z-40 shadow-xl">
                <div className="h-20 flex items-center justify-center border-b border-slate-700 shadow-lg">
                    <h2 className="text-2xl font-bold text-blue-400 tracking-wider">RentAdmin.</h2>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {/* Menü elemanlarını döngüyle basıyoruz */}
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.id}
                            icon={item.icon}
                            text={item.label}
                            active={activeTab === item.id}
                            onClick={() => setActiveTab(item.id)}
                        />
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-700">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold">
                            {user.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate">{user.username}</p>
                            <p className="text-xs text-gray-400">Admin</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition text-sm font-medium"
                    >
                        <FaSignOutAlt /> Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* --- SAĞ TARAF (İÇERİK ALANI) --- */}
            <main className="flex-1 h-full overflow-y-auto bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto pb-20">
                    {activeTab === "dashboard" && <DashboardView />}
                    {activeTab === "cars" && <CarsView />}
                    {activeTab === "users" && <UsersView />}
                    {activeTab === "roles" && <RolesView />}
                </div>
            </main>
        </div>
    );
}