"use client";

import BrandLogos from '@/widgets/BrandLogos';
import { ReactNode } from 'react';
import { useState } from "react";
import { FaCar, FaCog, FaGasPump, FaSnowflake, FaSearch, FaAngleRight, FaShuttleVan, FaCarSide, FaTruckPickup } from "react-icons/fa";




export default function VehiclesPage() {
    // --- 1. MOCK DATA (Veritabanı gelene kadar) ---
    const allCars = [
        {
            id: 1,
            brand: "Mercedes",
            model: "C-Class",
            type: "Sedan",
            price: 125,
            transmission: "Otomatik",
            fuel: "Benzin",
            seats: 5,
            img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 2,
            brand: "Porsche",
            model: "911 Carrera",
            type: "Sport",
            price: 350,
            transmission: "Manuel",
            fuel: "Benzin",
            seats: 2,
            img: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 3,
            brand: "Toyota",
            model: "Corolla",
            type: "Sedan",
            price: 45,
            transmission: "Otomatik",
            fuel: "Hibrit",
            seats: 5,
            img: "https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 4,
            brand: "Range Rover",
            model: "Sport",
            type: "SUV",
            price: 180,
            transmission: "Otomatik",
            fuel: "Dizel",
            seats: 5,
            img: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 5,
            brand: "Ford",
            model: "Mustang GT",
            type: "Sport",
            price: 140,
            transmission: "Manuel",
            fuel: "Benzin",
            seats: 4,
            img: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 6,
            brand: "Jeep",
            model: "Wrangler",
            type: "SUV",
            price: 110,
            transmission: "Otomatik",
            fuel: "Dizel",
            seats: 5,
            img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 7,
            brand: "Volkswagen",
            model: "Transporter",
            type: "Minivan",
            price: 90,
            transmission: "Manuel",
            fuel: "Dizel",
            seats: 9,
            img: "https://images.unsplash.com/photo-1603579045548-52267597ac26?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 8,
            brand: "BMW",
            model: "M4 Competition",
            type: "Sport",
            price: 200,
            transmission: "Otomatik",
            fuel: "Benzin",
            seats: 4,
            img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 9,
            brand: "Audi",
            model: "A6",
            type: "Sedan",
            price: 115,
            transmission: "Otomatik",
            fuel: "Dizel",
            seats: 5,
            img: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop"
        },
    ];

    // --- 2. STATE (Filtreleme İçin) ---
    const [selectedCategory, setSelectedCategory] = useState("Tümü");

    // Kategorileri belirle
    const categories = ["Tümü", "Sedan", "SUV", "Sport", "Minivan"];

    // 👇 İKON EŞLEŞTİRME HARİTASI (Burayı ekle)
    const categoryIcons: { [key: string]: ReactNode } = {
        "Tümü": <FaSearch />,
        "Sedan": <FaCarSide />,
        "SUV": <FaTruckPickup />,
        "Sport": <FaCar />,
        "Minivan": <FaShuttleVan />
    };

    // Seçilen kategoriye göre araçları filtrele
    const filteredCars = selectedCategory === "Tümü"
        ? allCars
        : allCars.filter(car => car.type === selectedCategory);

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
                                {categoryIcons[cat]}
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
                        <div key={car.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-lg hover:shadow-2xl transition duration-300 group">

                            {/* Resim Alanı */}
                            <div className="relative h-48 bg-gray-100 rounded-xl overflow-hidden mb-5 flex items-center justify-center">
                                <img
                                    src={car.img}
                                    alt={car.model}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                                    {car.type}
                                </div>
                            </div>

                            {/* Başlık ve Fiyat */}
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{car.brand}</h3>
                                    <p className="text-gray-500 text-sm">{car.model}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-indigo-600 font-bold text-xl">${car.price}</p>
                                    <p className="text-gray-400 text-xs">/günlük</p>
                                </div>
                            </div>

                            {/* Özellikler (Grid veya Flex) */}
                            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 mb-5">
                                <div className="flex flex-col items-center text-center gap-1">
                                    <FaCog className="text-gray-400" />
                                    <span className="text-xs text-gray-500 font-semibold">{car.transmission}</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-1 border-l border-r border-gray-100">
                                    <FaGasPump className="text-gray-400" />
                                    <span className="text-xs text-gray-500 font-semibold">{car.fuel}</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-1">
                                    <FaSnowflake className="text-gray-400" />
                                    <span className="text-xs text-gray-500 font-semibold">Klima</span>
                                </div>
                            </div>

                            {/* Buton */}
                            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer">
                                Detayları Gör <FaAngleRight />
                            </button>

                        </div>
                    ))}
                </div>

                {/* Eğer sonuç yoksa gösterilecek mesaj */}
                {filteredCars.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl text-gray-200 mb-4 flex justify-center"><FaCar /></div>
                        <h3 className="text-xl font-bold text-gray-600">Bu kategoride araç bulunamadı.</h3>
                    </div>
                )}

                <div className="mt-20">
                    <BrandLogos />
                </div>
            </div>


        </main>
    );
}