// app/cars/page.tsx
"use client";

import BrandLogos from '@/widgets/BrandLogos';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { useCars } from '@/app/hooks/useCars';
import { FaCar, FaCog, FaGasPump, FaSnowflake, FaSearch, FaAngleRight, FaShuttleVan, FaCarSide, FaTruckPickup, FaSpinner } from "react-icons/fa";

export default function VehiclesPage() {
    // 🧠 TÜM VERİ ÇEKME VE LOADING MANTIĞINI HOOK'TAN ÇEKİYORUZ
    const { cars, loading } = useCars();
    const [selectedCategory, setSelectedCategory] = useState("Tümü");

    // --- FİLTRELEME VE İKON AYARLARI ---
    const categories = ["Tümü", "Sedan", "SUV", "Sport", "Minivan", "Hatchback"];

    const categoryIcons: { [key: string]: ReactNode } = {
        "Tümü": <FaSearch />,
        "Sedan": <FaCarSide />,
        "SUV": <FaTruckPickup />,
        "Sport": <FaCar />,
        "Minivan": <FaShuttleVan />,
        "Hatchback": <FaCar />
    };

    // Seçilen kategoriye göre araçları filtrele
    const filteredCars = selectedCategory === "Tümü"
        ? cars
        : cars.filter(car => car.bodyType === selectedCategory);

    // --- YÜKLENİYOR (LOADING) EKRANI ---
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <FaSpinner className="animate-spin text-indigo-600 text-6xl mb-4" />
                <h2 className="text-2xl font-bold text-gray-700">Garajın kapıları açılıyor...</h2>
            </div>
        );
    }

    // --- ANA EKRAN (RENDER) ---
    return (
        <main className="bg-gray-50 min-h-screen pb-20">
            {/* --- BAŞLIK ALANI --- */}
            <div className="bg-white pt-24 pb-10 px-6 text-center shadow-sm">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
                    Araç Grubunu Seç
                </h1>
                <p className="text-gray-500 mt-2">İhtiyacına ve bütçene en uygun aracı filomuzdan hemen bul.</p>

                {/* FİLTRE BUTONLARI */}
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full border text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer
                                ${selectedCategory === cat
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-300"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600"
                                }`}
                        >
                            <span className="text-lg">
                                {categoryIcons[cat] || <FaCar />}
                            </span>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- ARAÇ LİSTESİ (GRID) --- */}
            <div className="container mx-auto px-6 lg:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCars.map((car) => (
                        <div key={car.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-lg hover:shadow-2xl transition duration-300 group flex flex-col justify-between">

                            <div>
                                {/* Resim Alanı */}
                                <div className="relative h-48 bg-gray-100 rounded-xl overflow-hidden mb-5 flex items-center justify-center">
                                    <Image
                                        src={
                                            car.imageUrl?.startsWith('http')
                                                ? car.imageUrl
                                                : `http://localhost:5261/${car.imageUrl?.replace(/^\//, '')}`
                                        }
                                        alt={car.model}
                                        fill
                                        className="object-cover group-hover:scale-110 transition duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        unoptimized
                                    />
                                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                                        {car.bodyType}
                                    </div>
                                    {/* Müsaitlik Durumu Badge'i */}
                                    {!car.isAvailable && (
                                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                            Kirada
                                        </div>
                                    )}
                                </div>

                                {/* Başlık ve Fiyat */}
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{car.brand}</h3>
                                        <p className="text-gray-500 text-sm">{car.model} • {car.year}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-indigo-600 font-bold text-xl">₺{car.pricePerDay}</p>
                                        <p className="text-gray-400 text-xs">/günlük</p>
                                    </div>
                                </div>

                                {/* Özellikler */}
                                <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 mb-5">
                                    <div className="flex flex-col items-center text-center gap-1">
                                        <FaCog className="text-gray-400" />
                                        <span className="text-xs text-gray-500 font-semibold">{car.transmission}</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center gap-1 border-l border-r border-gray-100">
                                        <FaGasPump className="text-gray-400" />
                                        <span className="text-xs text-gray-500 font-semibold">{car.fuelType}</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center gap-1">
                                        <FaSnowflake className="text-gray-400" />
                                        <span className="text-xs text-gray-500 font-semibold">Klima</span>
                                    </div>
                                </div>
                            </div>

                            {/* Buton - Detay Sayfasına Yönlendiren Link */}
                            {car.isAvailable ? (
                                <Link
                                    href={`/cars/${car.id}`}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
                                >
                                    Hemen Kirala <FaAngleRight />
                                </Link>
                            ) : (
                                <button
                                    disabled
                                    className="w-full bg-gray-300 text-gray-500 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-not-allowed"
                                >
                                    Müsait Değil <FaAngleRight />
                                </button>
                            )}

                        </div>
                    ))}
                </div>

                {/* Eğer sonuç yoksa gösterilecek mesaj */}
                {filteredCars.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl text-gray-200 mb-4 flex justify-center"><FaCar /></div>
                        <h3 className="text-xl font-bold text-gray-600">Bu kategoride veya filomuzda araç bulunamadı.</h3>
                    </div>
                )}

                <div className="mt-20">
                    <BrandLogos />
                </div>
            </div>
        </main>
    );
}