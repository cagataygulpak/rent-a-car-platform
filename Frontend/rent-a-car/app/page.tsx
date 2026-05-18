/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCars } from "@/app/hooks/useCars";
import {
  FaMapMarkerAlt, FaSearch, FaShieldAlt, FaWallet, FaStar,
  FaCogs, FaGasPump, FaUserFriends, FaApple, FaGooglePlay,
  FaSpinner
} from "react-icons/fa";

export default function HomePage() {
  // 🧠 VERİLERİ VERİTABANINDAN ÇEKMEK İÇİN HOOK'UMUZU ÇAĞIRIYORUZ
  const { cars, loading } = useCars();

  // Veritabanından gelen araçlardan ilk 6 tanesini popüler araç olarak seçiyoruz
  const popularCars = cars.slice(0, 6);

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* --- 1. HERO SECTION (MOR ALAN) --- */}
      <section className="relative bg-linear-to-br from-indigo-900 to-blue-900 text-white pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">

          {/* Sol Taraf: Metin */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
              Yolu Daha Önce Hiç Olmadığı Gibi <br /> <span className="text-orange-400">Deneyimle.</span>
            </h1>
            <p className="text-blue-200 text-lg max-w-lg mx-auto lg:mx-0">
              Konforlu, güvenli ve bütçe dostu araçlarla seyahatin tadını çıkar. Hayalindeki aracı şimdi kirala.
            </p>
            <Link href="/cars" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg shadow-orange-500/30 cursor-pointer">
              Hemen Kirala
            </Link>
          </div>

          {/* Sağ Taraf: Rezervasyon Formu */}
          <div className="lg:w-1/3 w-full bg-white text-gray-800 p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Aracını Seç</h3>
            <form className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Araç Tipi</label>
                <select className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                  <option>Tüm Araçlar</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Sport</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Alış Yeri</label>
                  <input
                    type="text"
                    placeholder="Şehir seçin"
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">İade Yeri</label>
                  <input
                    type="text"
                    placeholder="Şehir seçin"
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Alış Tarihi</label>
                  <input
                    type="date"
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">İade Tarihi</label>
                  <input
                    type="date"
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <Link
                href="/cars"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl mt-4 transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <FaSearch /> Araç Bul
              </Link>
            </form>
          </div>
        </div>
      </section>

      {/* --- 2. ÖZELLİKLER (ICONS BAR) --- */}
      <section className="container mx-auto px-6 lg:px-12 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-4">
              <FaMapMarkerAlt />
            </div>
            <h4 className="font-bold text-lg text-black">Geniş Lokasyon</h4>
            <p className="text-gray-500 text-sm mt-2">İstediğin yerden al, istediğin yere bırak. Sınır tanıma.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 text-2xl mb-4">
              <FaShieldAlt />
            </div>
            <h4 className="font-bold text-lg text-black">Güvenli Sürüş</h4>
            <p className="text-gray-500 text-sm mt-2">Tüm araçlarımız kaskolu ve 7/24 yol yardım destekli.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-2xl mb-4">
              <FaWallet />
            </div>
            <h4 className="font-bold text-lg text-black">En İyi Fiyat</h4>
            <p className="text-gray-500 text-sm mt-2">Gizli ücret yok. Bütçene en uygun aracı hemen bul.</p>
          </div>
        </div>
      </section>

      {/* --- 3. NEDEN BİZ --- */}
      <section className="container mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop"
              alt="Happy Customer"
              className="rounded-3xl shadow-2xl w-full object-cover h-125"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600"><FaUserFriends size={24} /></div>
                <div>
                  <p className="font-bold text-2xl text-gray-900">15K+</p>
                  <p className="text-sm text-gray-500">Mutlu Müşteri</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <h4 className="text-blue-600 font-bold uppercase tracking-wider text-sm">Neden Bizi Seçmelisin?</h4>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">Maceran İçin En İyi Araçları Sunuyoruz</h2>
            <p className="text-gray-500 leading-relaxed">
              Sadece araba kiralamıyoruz, size özgürlüğü sunuyoruz. Geniş araç filomuz, uygun fiyatlarımız ve müşteri odaklı hizmet anlayışımızla yanınızdayız.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {[
                "En İyi Fiyat Garantisi",
                "Ücretsiz İptal İmkanı",
                "7/24 Müşteri Desteği",
                "Bakımlı & Temiz Araçlar"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">
                    <FaStar />
                  </div>
                  <span className="font-semibold text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. POPÜLER ARAÇLAR (GRID - DİNAMİK YAPILDI) --- */}
      <section className="py-24 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Sana Uygun Aracı Seç</h2>
              <p className="text-gray-500 mt-2">Filomuzdaki en popüler araçları incele</p>
            </div>
            <Link href="/cars" className="text-blue-600 font-bold hover:underline hidden md:block">Tümünü Gör →</Link>
          </div>

          {/* LOADING DURUMU */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <FaSpinner className="animate-spin text-indigo-600 text-4xl mb-3" />
              <p className="text-gray-500 font-medium">En popüler araçlar garajdan çıkarılıyor...</p>
            </div>
          ) : (
            /* DİNAMİK VERİ TABANI GRİD YAPISI */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularCars.map((car) => (
                <div
                  key={car.id}
                  className="border border-gray-100 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition duration-300 group flex flex-col justify-between bg-gray-50/30"
                >
                  <div>
                    {/* Araba Resmi */}
                    <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
                      <Image
                        src={
                          car.imageUrl?.startsWith('http')
                            ? car.imageUrl
                            : `http://localhost:5261/${car.imageUrl?.replace(/^\//, '')}`
                        }
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 z-10">{car.bodyType}</span>

                      {!car.isAvailable && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">Kirada</span>
                      )}
                    </div>

                    {/* Bilgiler */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 leading-tight">{car.brand}</h3>
                          <p className="text-xs text-gray-400 mt-0.5">{car.model} • {car.year}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-indigo-600 font-bold text-lg">₺{car.pricePerDay}</p>
                          <p className="text-gray-400 text-[10px]">/gün</p>
                        </div>
                      </div>

                      {/* Özellik İkonları */}
                      <div className="flex items-center gap-4 text-gray-500 text-xs py-3 border-t border-gray-100">
                        <div className="flex items-center gap-1"><FaCogs /> {car.transmission}</div>
                        <div className="flex items-center gap-1"><FaUserFriends /> {car.seatCount} Kişi</div>
                        <div className="flex items-center gap-1"><FaGasPump /> {car.fuelType}</div>
                      </div>
                    </div>
                  </div>

                  {/* Detay Sayfasına Yönlendiren Akıllı Buton */}
                  <div className="mt-4">
                    {car.isAvailable ? (
                      <Link
                        href={`/cars/${car.id}`}
                        className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow-md shadow-indigo-600/10 cursor-pointer"
                      >
                        Hemen Kirala
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-200 text-gray-400 font-bold py-3 rounded-xl cursor-not-allowed"
                      >
                        Müsait Değil
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobil Görünüm Tümünü Gör */}
          <div className="mt-8 text-center md:hidden">
            <Link href="/cars" className="font-bold hover:underline text-black">Tümünü Gör →</Link>
          </div>
        </div>
      </section>

      {/* --- 5. İSTATİSTİKLER (FACTS) --- */}
      <section className="bg-indigo-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">Rakamlarla Biz</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <h3 className="text-4xl font-extrabold text-orange-400 mb-2">500+</h3>
              <p className="text-blue-100 text-sm">Araç Filosu</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <h3 className="text-4xl font-extrabold text-orange-400 mb-2">15K+</h3>
              <p className="text-blue-100 text-sm">Mutlu Müşteri</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <h3 className="text-4xl font-extrabold text-orange-400 mb-2">20+</h3>
              <p className="text-blue-100 text-sm">Şube Sayısı</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <h3 className="text-4xl font-extrabold text-orange-400 mb-2">1M+</h3>
              <p className="text-blue-100 text-sm">Toplam Kilometre</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. MOBİL APP DOWNLOAD --- */}
      <section className="container mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col lg:flex-row items-center rounded-3xl p-8 lg:p-16 relative overflow-hidden">
          <div className="lg:w-1/2 space-y-6 relative z-10">
            <h2 className="text-4xl font-extrabold text-gray-900">Mobil Uygulamamızı İndirin</h2>
            <p className="text-gray-500 text-lg">
              Aracınızı cebinizden kiralayın, özel indirimleri kaçırmayın. App Store ve Google Play&apos;de yayındayız.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition shadow-lg cursor-pointer">
                <FaApple className="text-3xl" />
                <div className="text-left">
                  <p className="text-xs leading-none">Download on the</p>
                  <p className="font-bold text-lg">App Store</p>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition shadow-lg cursor-pointer">
                <FaGooglePlay className="text-2xl ml-1" />
                <div className="text-left ml-1">
                  <p className="text-xs leading-none">GET IT ON</p>
                  <p className="font-bold text-lg">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center relative z-10">
            <img
              src="https://framerusercontent.com/images/3m72Wz5T03t6U89ZzLgR94o.png"
              alt="Mobile App"
              className="w-full max-w-md drop-shadow-2xl transform lg:rotate-6 lg:translate-y-12 hover:rotate-0 transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* --- 7. ALT BANNER (Newsletter) --- */}
      <section className="bg-indigo-600 py-12">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white">
            <h2 className="text-3xl font-bold">Yolculuğun Tadını Çıkarın</h2>
            <p className="text-indigo-200">En yeni kampanyalardan haberdar olmak için bültene abone olun.</p>
          </div>
          <div className="w-full md:w-auto bg-white p-2 rounded-xl flex shadow-lg">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="px-4 py-2 outline-none text-gray-700 w-full md:w-64" />
            <button className="bg-orange-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-orange-600 transition">Abone Ol</button>
          </div>
        </div>
      </section>

    </main>
  );
}