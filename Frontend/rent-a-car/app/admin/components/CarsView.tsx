"use client"; // Hook kullandığımız için şart
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";

interface Car {
    id: number;
    brand: string;
    model: string;
    dailyPrice: number;
    imageUrl: string;
}

export default function CarsView() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5261/api/Cars")
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => setCars(data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">Araç Yönetimi</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-md">
                    <FaPlus /> Yeni Ekle
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4">Görsel</th>
                            <th className="px-6 py-4">Marka / Model</th>
                            <th className="px-6 py-4">Fiyat</th>
                            <th className="px-6 py-4 text-right">İşlem</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={4} className="p-6 text-center text-gray-500">Yükleniyor...</td></tr>
                        ) : cars.length === 0 ? (
                            <tr><td colSpan={4} className="p-6 text-center text-gray-500">Araç bulunamadı.</td></tr>
                        ) : (
                            cars.map((car) => (
                                <tr key={car.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-3">
                                        <div className="w-16 h-10 bg-gray-200 rounded overflow-hidden relative">
                                            {car.imageUrl && (
                                                <Image
                                                    src={car.imageUrl}
                                                    alt="car"
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 font-medium">{car.brand} {car.model}</td>
                                    <td className="px-6 py-3 text-green-600 font-bold">₺{car.dailyPrice}</td>
                                    <td className="px-6 py-3 text-right">
                                        <button className="text-blue-600 hover:underline text-sm">Düzenle</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}