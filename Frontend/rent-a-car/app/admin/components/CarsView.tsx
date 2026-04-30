"use client";
import React from "react";
import Image from "next/image";
import { useCars } from "@/app/hooks/useCars";
import { FaCamera } from "react-icons/fa";

export default function CarsView() {
    const { cars, loading, editingCar, setEditingCar, isAddModalOpen, setIsAddModalOpen, newCarData, setNewCarData, handleDelete, handleUpdate, handleAdd, handleImageUpload, handleEditImageUpload } = useCars();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-xl font-medium text-gray-500 animate-pulse">
                    Araçlar Yükleniyor... 🏎️
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* --- BAŞLIK VE EKLE BUTONU --- */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Filo Yönetimi</h1>
                        <p className="text-gray-500 mt-1 text-sm">Sistemdeki tüm araçları buradan ekleyebilir, güncelleyebilir ve silebilirsiniz.</p>
                    </div>
                    {/* YENİ ARAÇ EKLE BUTONU */}
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center"
                    >
                        <span className="mr-2 text-xl leading-none">+</span> Yeni Araç Ekle
                    </button>
                </div>

                {/* --- ARAÇ LİSTESİ (TABLO) --- */}
                <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                                    <th className="py-4 px-6 font-semibold w-24">Görsel</th>
                                    <th className="py-4 px-6 font-semibold">Marka / Model</th>
                                    <th className="py-4 px-6 font-semibold">Yıl</th>
                                    <th className="py-4 px-6 font-semibold">Fiyat (Günlük)</th>
                                    <th className="py-4 px-6 font-semibold text-right">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                {cars.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-gray-400 italic">
                                            Filoda henüz araç bulunmuyor.
                                        </td>
                                    </tr>
                                ) : (
                                    cars.map((car) => (
                                        <tr key={car.id} className="hover:bg-blue-50/50 transition duration-150">
                                            {/* FOTOĞRAF SÜTUNU */}
                                            <td className="py-3 px-6">
                                                {car.imageUrl ? (
                                                    <div className="relative w-16 h-12">
                                                        <Image
                                                            src={
                                                                car.imageUrl?.startsWith('http')
                                                                    ? car.imageUrl
                                                                    : `http://localhost:5261/${car.imageUrl?.replace(/^\//, '')}`
                                                            }
                                                            alt={car.brand}
                                                            fill
                                                            className="object-cover rounded-md shadow-sm border border-gray-200"
                                                            sizes="64px"
                                                            unoptimized
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-16 h-12 bg-gray-100 rounded-md flex items-center justify-center text-[10px] text-gray-400 border border-dashed border-gray-300">
                                                        Foto Yok
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-gray-900">{car.brand}</div>
                                                <div className="text-sm text-gray-500">{car.model}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    {car.year}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 font-semibold text-green-600">
                                                {car.pricePerDay} ₺
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-3">
                                                <button
                                                    onClick={() => setEditingCar(car)}
                                                    className="inline-flex items-center text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors border border-transparent hover:border-blue-600"
                                                >
                                                    Düzenle
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(car.id)}
                                                    className="inline-flex items-center text-sm font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-600 hover:text-white transition-colors border border-transparent hover:border-red-600"
                                                >
                                                    Sil
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- 1. YENİ ARAÇ EKLEME MODALI --- */}
                {/* YENİ ARAÇ EKLEME MODALI - GENİŞLETİLMİŞ VERSİYON */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-300 bg-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-extrabold text-black">Yeni Araç Detayları</h2>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-black hover:text-red-600 text-3xl font-bold">&times;</button>
                            </div>

                            <form onSubmit={handleAdd} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                {/* 1. SATIR: Marka - Model */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Marka</label>
                                        <input type="text" value={newCarData.brand} onChange={(e) => setNewCarData({ ...newCarData, brand: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Model</label>
                                        <input type="text" value={newCarData.model} onChange={(e) => setNewCarData({ ...newCarData, model: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" required />
                                    </div>
                                </div>

                                {/* 2. SATIR: Vites - Yakıt - Kasa */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Vites</label>
                                        <select value={newCarData.transmission} onChange={(e) => setNewCarData({ ...newCarData, transmission: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none">
                                            <option value="Otomatik">Otomatik</option>
                                            <option value="Manuel">Manuel</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Yakıt</label>
                                        <select value={newCarData.fuelType} onChange={(e) => setNewCarData({ ...newCarData, fuelType: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none">
                                            <option value="Benzin">Benzin</option>
                                            <option value="Dizel">Dizel</option>
                                            <option value="Hibrit">Hibrit</option>
                                            <option value="Elektrik">Elektrik</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Kasa</label>
                                        <select value={newCarData.bodyType} onChange={(e) => setNewCarData({ ...newCarData, bodyType: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none">
                                            <option value="Sedan">Sedan</option>
                                            <option value="SUV">SUV</option>
                                            <option value="Hatchback">Hatchback</option>
                                        </select>
                                    </div>
                                </div>

                                {/* 3. SATIR: KM - Renk - Plaka */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Kilometre</label>
                                        <input type="number" value={newCarData.kilometer} onChange={(e) => setNewCarData({ ...newCarData, kilometer: Number(e.target.value) })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Renk</label>
                                        <input type="text" value={newCarData.color} onChange={(e) => setNewCarData({ ...newCarData, color: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Plaka</label>
                                        <input type="text" value={newCarData.plateNumber} onChange={(e) => setNewCarData({ ...newCarData, plateNumber: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none" placeholder="34 ABC 123" />
                                    </div>
                                </div>

                                {/* 4. SATIR: Fiyat - Depozito - Yıl */}
                                <div className="grid grid-cols-3 gap-4 bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300">
                                    <div>
                                        <label className="block text-xs font-black text-blue-700 uppercase mb-1">Günlük ₺</label>
                                        <input type="number" value={newCarData.pricePerDay} onChange={(e) => setNewCarData({ ...newCarData, pricePerDay: Number(e.target.value) })} className="w-full text-black border border-blue-300 rounded-lg px-3 py-2 outline-none" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Depozito ₺</label>
                                        <input type="number" value={newCarData.depositPrice} onChange={(e) => setNewCarData({ ...newCarData, depositPrice: Number(e.target.value) })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Model Yılı</label>
                                        <input type="number" value={newCarData.year} onChange={(e) => setNewCarData({ ...newCarData, year: Number(e.target.value) })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none" required />
                                    </div>
                                </div>

                                {/* 5. SATIR: Görsel URL */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-black text-black uppercase">Araç Fotoğrafı</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center hover:border-blue-500 transition-colors bg-gray-50">
                                        {newCarData.imageUrl ? (
                                            <div className="relative w-full h-40">
                                                <Image
                                                    src={editingCar.imageUrl.startsWith('/')
                                                        ? `http://localhost:5261/${editingCar.imageUrl.replace(/^\//, '')}`
                                                        : editingCar.imageUrl}
                                                    alt="Araç Önizleme"
                                                    fill
                                                    className="object-cover rounded-lg shadow-inner"
                                                    unoptimized // Localhost'tan çektiğimiz için optimizasyon hatası vermemesi adına ekledik
                                                />
                                                <button
                                                    onClick={() => setNewCarData({ ...newCarData, imageUrl: "" })}
                                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="cursor-pointer flex flex-col items-center">
                                                <FaCamera className="text-3xl text-gray-400 mb-2" />
                                                <span className="text-sm font-bold text-black">Fotoğraf Seç veya Sürükle</span>
                                                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                {/* 6. SATIR: Açıklama */}
                                <div>
                                    <label className="block text-xs font-black text-black uppercase mb-1">Araç Açıklaması</label>
                                    <textarea rows={2} value={newCarData.description} onChange={(e) => setNewCarData({ ...newCarData, description: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none resize-none"></textarea>
                                </div>

                                {/* 7. SATIR: Kurallar (Yaş - Findex - Koltuk) */}
                                <div className="grid grid-cols-3 gap-4 border-t pt-4">
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Min. Sürücü Yaşı</label>
                                        <input type="number" value={newCarData.minDriverAge} onChange={(e) => setNewCarData({ ...newCarData, minDriverAge: Number(e.target.value) })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Min. Findex</label>
                                        <input type="number" value={newCarData.minFindexScore} onChange={(e) => setNewCarData({ ...newCarData, minFindexScore: Number(e.target.value) })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Koltuk Sayısı</label>
                                        <input type="number" value={newCarData.seatCount} onChange={(e) => setNewCarData({ ...newCarData, seatCount: Number(e.target.value) })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none" />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end space-x-3 bg-white sticky bottom-0">
                                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-black bg-white border border-gray-400 rounded-xl hover:bg-gray-100 transition-colors">İptal</button>
                                    <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 shadow-lg shadow-green-500/20 transition-all">Aracı Kaydet</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* --- 2. GÜNCELLEME MODALI (FULL DETAY) --- */}
                {editingCar && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto font-sans">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
                            {/* Modal Başlık */}
                            <div className="px-6 py-4 border-b border-gray-300 bg-blue-50 flex justify-between items-center">
                                <h2 className="text-xl font-extrabold text-black uppercase tracking-tight">
                                    Aracı Düzenle: {editingCar.brand} {editingCar.model}
                                </h2>
                                <button
                                    onClick={() => setEditingCar(null)}
                                    className="text-black hover:text-red-600 text-3xl font-bold transition-colors"
                                >
                                    &times;
                                </button>
                            </div>

                            <form onSubmit={handleUpdate} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">

                                {/* 1. SATIR: Marka - Model */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Marka</label>
                                        <input type="text" value={editingCar.brand || ""} onChange={(e) => setEditingCar({ ...editingCar, brand: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none font-bold" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Model</label>
                                        <input type="text" value={editingCar.model || ""} onChange={(e) => setEditingCar({ ...editingCar, model: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none font-bold" required />
                                    </div>
                                </div>

                                {/* 2. SATIR: Vites - Yakıt - Kasa */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Vites</label>
                                        <select value={editingCar.transmission || "Otomatik"} onChange={(e) => setEditingCar({ ...editingCar, transmission: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none font-bold bg-white">
                                            <option value="Otomatik">Otomatik</option>
                                            <option value="Manuel">Manuel</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Yakıt</label>
                                        <select value={editingCar.fuelType || "Benzin"} onChange={(e) => setEditingCar({ ...editingCar, fuelType: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none font-bold bg-white">
                                            <option value="Benzin">Benzin</option>
                                            <option value="Dizel">Dizel</option>
                                            <option value="Hibrit">Hibrit</option>
                                            <option value="Elektrik">Elektrik</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Kasa</label>
                                        <select value={editingCar.bodyType || "Sedan"} onChange={(e) => setEditingCar({ ...editingCar, bodyType: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none font-bold bg-white">
                                            <option value="Sedan">Sedan</option>
                                            <option value="SUV">SUV</option>
                                            <option value="Hatchback">Hatchback</option>
                                        </select>
                                    </div>
                                </div>

                                {/* 3. SATIR: KM - Renk - Plaka */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Kilometre</label>
                                        <input type="number" value={editingCar.kilometer || 0} onChange={(e) => setEditingCar({ ...editingCar, kilometer: Number(e.target.value) })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none font-bold" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Renk</label>
                                        <input type="text" value={editingCar.color || ""} onChange={(e) => setEditingCar({ ...editingCar, color: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none font-bold" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Plaka</label>
                                        <input type="text" value={editingCar.plateNumber || ""} onChange={(e) => setEditingCar({ ...editingCar, plateNumber: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none font-bold" />
                                    </div>
                                </div>

                                {/* 4. SATIR: Fiyat - Depozito - Yıl (Önemli Alanlar) */}
                                <div className="grid grid-cols-3 gap-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
                                    <div>
                                        <label className="block text-xs font-black text-blue-700 uppercase mb-1">Günlük ₺</label>
                                        <input type="number" value={editingCar.pricePerDay || 0} onChange={(e) => setEditingCar({ ...editingCar, pricePerDay: Number(e.target.value) })} className="w-full text-black border border-blue-300 rounded-lg px-3 py-2 outline-none font-black" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Depozito ₺</label>
                                        <input type="number" value={editingCar.depositPrice || 0} onChange={(e) => setEditingCar({ ...editingCar, depositPrice: Number(e.target.value) })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none font-bold" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Model Yılı</label>
                                        <input type="number" value={editingCar.year || 2024} onChange={(e) => setEditingCar({ ...editingCar, year: Number(e.target.value) })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none font-bold" required />
                                    </div>
                                </div>

                                {/* 5. SATIR: Fotoğraf Güncelleme */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-black text-black uppercase">Araç Fotoğrafı Güncelle</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center hover:border-blue-500 transition-colors bg-gray-50">
                                        {editingCar.imageUrl ? (
                                            <div className="relative w-full h-44">
                                                <Image
                                                    src={editingCar.imageUrl.startsWith('/')
                                                        ? `http://localhost:5261/${editingCar.imageUrl.replace(/^\//, '')}`
                                                        : editingCar.imageUrl}
                                                    alt="Araç Önizleme"
                                                    fill
                                                    className="object-cover rounded-lg shadow-inner"
                                                    unoptimized // Localhost'tan çektiğimiz için optimizasyon hatası vermemesi adına ekledik
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingCar({ ...editingCar, imageUrl: "" })}
                                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
                                                >
                                                    &times;
                                                </button>
                                                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                                                    Değiştirmek için çarpıya basıp yeni dosya seçin
                                                </div>
                                            </div>
                                        ) : (
                                            <label className="cursor-pointer flex flex-col items-center w-full py-8">
                                                <FaCamera className="text-4xl text-blue-500 mb-2" />
                                                <span className="text-sm font-black text-black">Yeni Fotoğraf Yükle</span>
                                                <p className="text-[10px] text-gray-500">Tıklayın veya dosyayı buraya bırakın</p>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => handleEditImageUpload(e)} // Birazdan bu fonksiyonu hook'a ekleyeceğiz
                                                    accept="image/*"
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                {/* 6. SATIR: Açıklama */}
                                <div>
                                    <label className="block text-xs font-black text-black uppercase mb-1">Araç Açıklaması</label>
                                    <textarea rows={2} value={editingCar.description || ""} onChange={(e) => setEditingCar({ ...editingCar, description: e.target.value })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none resize-none font-medium"></textarea>
                                </div>

                                {/* 7. SATIR: Kurallar */}
                                <div className="grid grid-cols-3 gap-4 border-t pt-4">
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Min. Yaş</label>
                                        <input type="number" value={editingCar.minDriverAge || 18} onChange={(e) => setEditingCar({ ...editingCar, minDriverAge: Number(e.target.value) })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none font-bold" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Min. Findex</label>
                                        <input type="number" value={editingCar.minFindexScore || 0} onChange={(e) => setEditingCar({ ...editingCar, minFindexScore: Number(e.target.value) })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none font-bold" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-black uppercase mb-1">Koltuk</label>
                                        <input type="number" value={editingCar.seatCount || 5} onChange={(e) => setEditingCar({ ...editingCar, seatCount: Number(e.target.value) })} className="w-full text-black border border-gray-400 rounded-lg px-3 py-2 outline-none font-bold" />
                                    </div>
                                </div>

                                {/* Butonlar */}
                                <div className="pt-6 flex justify-end space-x-3 bg-white sticky bottom-0 border-t mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditingCar(null)}
                                        className="px-6 py-2.5 text-sm font-bold text-black bg-white border border-gray-400 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        Vazgeç
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
                                    >
                                        Değişiklikleri Kaydet
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}