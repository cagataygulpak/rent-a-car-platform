import React from "react";
import { FaCar, FaUsers, FaUserShield } from "react-icons/fa";


interface StatCardProps {
    title: string;
    value: string | number;
    color: string;
    icon: React.ReactNode;
}

const StatCard = ({ title, value, color, icon }: StatCardProps) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition">
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className={`w-14 h-14 rounded-2xl ${color} text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition`}>
            {icon}
        </div>
    </div>
);


export default function DashboardView() {
    return (
        <div className="animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-4">Genel Durum</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Toplam Araç"
                    value="124"
                    color="bg-blue-500"
                    icon={<FaCar />} />
                <StatCard
                    title="Kayıtlı Kullanıcı"
                    value="3,402"
                    color="bg-purple-500"
                    icon={<FaUsers />} />
                <StatCard
                    title="Aktif Kiralama"
                    value="18"
                    color="bg-green-500"
                    icon={<FaUserShield />} />
            </div>

            <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
                [Buraya Aylık Kazanç Grafiği Gelecek]
            </div>
        </div>
    );
}