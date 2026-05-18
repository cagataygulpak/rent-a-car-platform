"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCarDetail } from "@/app/hooks/useCarDetail";
import {
    FaCog, FaGasPump, FaSnowflake, FaUserFriends, FaRoad,
    FaShieldAlt, FaIdCard, FaChevronLeft, FaSpinner, FaCalendarAlt
} from "react-icons/fa";

export default function CarDetailPage() {
    const params = useParams();
    const id = Number(params.id);

    const { car, loading, error } = useCarDetail(id);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <FaSpinner className="animate-spin text-indigo-600 text-6xl mb-4" />
                <h2 className="text-2xl font-bold text-gray-700">Araç detayları hazırlanıyor...</h2>
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200 text-center max-w-md shadow-sm">
                    <h2 className="text-xl font-bold mb-2">Bir Hata Oluştu!</h2>
                    <p className="mb-4">{error || "Araç bulunamadı."}</p>
                    <Link href="/cars" className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition">
                        <FaChevronLeft /> Galeriye Dön
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-gray-50 min-h-screen pt-24 pb-20 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">

                {/* GERİ DÖNÜŞ LİNKİ */}
                <Link href="/cars" className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-bold mb-6 transition">
                    <FaChevronLeft /> Araç Listesine Dön
                </Link>

                {/* ANA DETAY BLOKLARI */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-xl">

                    {/* SOL TARAF: ARABA RESMİ */}
                    <div className="space-y-6">
                        <div className="relative h-64 md:h-96 bg-gray-100 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border border-gray-200">
                            <Image
                                src={
                                    car.imageUrl?.startsWith('http')
                                        ? car.imageUrl
                                        : `http://localhost:5261/${car.imageUrl?.replace(/^\//, '')}`
                                }
                                alt={`${car.brand} ${car.model}`}
                                fill
                                className="object-cover"
                                unoptimized
                                priority
                            />
                        </div>

                        {/* AÇIKLAMA KUTUSU */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">Araç Açıklaması</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {car.description || `${car.brand} ${car.model}, konforlu ve güvenli bir sürüş deneyimi için filomuzda seni bekliyor. Detaylı bilgi ve kiralama şartları için sağ paneldeki kiralama adımlarını takip edebilirsin.`}
                            </p>
                        </div>
                    </div>

                    {/* SAĞ TARAF: TEKNİK ÖZELLİKLER & FİYATLANDIRMA */}
                    <div className="flex flex-col justify-between space-y-8">
                        <div>
                            {/* MARKA & MODEL & BADGE */}
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">{car.brand}</h1>
                                    <p className="text-xl text-gray-500 font-medium">{car.model}</p>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-xs font-black tracking-wide uppercase shadow-sm ${car.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {car.isAvailable ? "Müsait" : "Kirada"}
                                </span>
                            </div>

                            <hr className="border-gray-100 my-6" />

                            {/* TEKNİK ÖZELLİK MATRİSİ */}
                            <h3 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-4">Teknik Detaylar</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                                    <FaCog className="text-indigo-600 text-xl shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Şanzıman</p>
                                        <p className="text-sm font-bold text-gray-800">{car.transmission}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                                    <FaGasPump className="text-indigo-600 text-xl shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Yakıt Tipi</p>
                                        <p className="text-sm font-bold text-gray-800">{car.fuelType}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                                    <FaCalendarAlt className="text-indigo-600 text-xl shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Model Yılı</p>
                                        <p className="text-sm font-bold text-gray-800">{car.year}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                                    <FaRoad className="text-indigo-600 text-xl shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Kilometre</p>
                                        <p className="text-sm font-bold text-gray-800">{car.kilometer.toLocaleString()} km</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                                    <FaUserFriends className="text-indigo-600 text-xl shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Koltuk Sayısı</p>
                                        <p className="text-sm font-bold text-gray-800">{car.seatCount} Kişilik</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                                    <FaSnowflake className="text-indigo-600 text-xl shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Klima</p>
                                        <p className="text-sm font-bold text-gray-800">Mevcut</p>
                                    </div>
                                </div>
                            </div>

                            {/* KİRALAMA ŞARTLARI */}
                            <h3 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-4">Kiralama Şartları</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-amber-100 bg-amber-50/50 p-4 rounded-xl flex items-center gap-3">
                                    <FaShieldAlt className="text-amber-600 text-xl shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-amber-700 uppercase font-bold">Minimum Findex Puanı</p>
                                        <p className="text-base font-black text-amber-900">{car.minFindexScore} Puan</p>
                                    </div>
                                </div>
                                <div className="border border-blue-100 bg-blue-50/50 p-4 rounded-xl flex items-center gap-3">
                                    <FaIdCard className="text-blue-600 text-xl shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-blue-700 uppercase font-bold">Minimum Sürücü Yaşı</p>
                                        <p className="text-base font-black text-blue-900">{car.minDriverAge} Yaş</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FİYATLANDIRMA VE REZERVASYON KARTELASI */}
                        <div className="bg-gray-950 text-white rounded-2xl p-6 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-indigo-400">₺{car.pricePerDay}</span>
                                    <span className="text-xs text-gray-400">/ günlük</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Depozito Bedeli: <span className="text-white font-bold">₺{car.depositPrice}</span></p>
                            </div>

                            <button
                                disabled={!car.isAvailable}
                                className={`w-full md:w-auto px-8 py-4 rounded-xl font-black transition text-center text-sm shadow-lg tracking-wider uppercase
                                    ${car.isAvailable
                                        ? "bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-[1.02] cursor-pointer shadow-indigo-600/30"
                                        : "bg-gray-800 text-gray-500 cursor-not-allowed"}`}
                            >
                                {car.isAvailable ? "Rezervasyonu Başlat" : "Araç Kullanımda"}
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}