"use client";

import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {

    const pathname = usePathname(); // 👈 3. Mevcut adresi al (Örn: "/cars")
    const { user, logout, loading } = useAuth();

    // Linklerimiz ve yolları
    const navLinks = [
        { name: "Anasayfa", href: "/" },
        { name: "Araçlar", href: "/cars" }, // Vehicles
        { name: "Hakkımızda", href: "/about" },
        { name: "İletişim", href: "/contact" },
    ];
    return (
        <nav className="h-20 bg-white shadow-sm border-b flex items-center justify-between px-6 md:px-12">
            {/* LOGO KISMI */}
            <div className="text-2xl font-bold text-blue-600">
                <Link href="/">RentACar</Link>
            </div>

            {/* LİNKLER (Masaüstü) */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                    // 👇 4. AKTİF Mİ KONTROLÜ
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`font-medium transition-all duration-300 relative ${isActive
                                ? "text-indigo-600 font-bold" // Aktifse (Lacivert ve Kalın)
                                : "text-gray-500 hover:text-indigo-600" // Değilse (Gri ve Hover efekti)
                                }`}
                        >
                            {link.name}
                            {/* Altına Ufak Bir Nokta Efekti (Opsiyonel Süsleme) */}
                            {isActive && (
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* SAĞ TARAF */}
            <div className="flex items-center space-x-4">
                {loading ? (
                    // 🟡 YÜKLENİYOR (SKELETON LOADER)
                    // Gerçek butonların boyutuna ve şekline benzeyen gri kutular
                    <div className="flex items-center gap-3 animate-pulse">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div> {/* Giriş Yap yazısı gibi */}
                        <div className="h-10 w-24 bg-gray-200 rounded-full"></div> {/* Kayıt Ol butonu gibi */}
                    </div>
                ) : user ? (
                    // 🟢 KULLANICI VARSA (Senin yazdığın admin/hesabım kodları)
                    <div className="flex items-center gap-3">
                        {user.role === "Admin" && (
                            <Link href="/admin" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                                Admin Paneli
                            </Link>
                        )}
                        <Link href="/account" className="text-gray-700 font-medium text-sm border px-4 py-2 rounded-lg">
                            Hesabım
                        </Link>
                        <button onClick={logout} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                            Çıkış Yap
                        </button>
                    </div>
                ) : (
                    // 🔴 KULLANICI YOKSA (Giriş Yap / Kayıt Ol)
                    <div className="flex items-center space-x-4">
                        <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
                            Giriş Yap
                        </Link>
                        <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition shadow-md">
                            Kayıt Ol
                        </Link>
                    </div>
                )}
            </div>
        </nav >
    );
};

export default Navbar;