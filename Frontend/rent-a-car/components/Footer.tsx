"use client";
import Link from "next/link";
import { FaCar, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaApple, FaGooglePlay } from "react-icons/fa";
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    // 🛡️ KONTROL: Eğer admin panelindeysek Footer'ı GÖSTERME (null dön)
    if (pathname.startsWith('/admin')) {
        return null;
    }
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
            <div className="container mx-auto px-6 lg:px-12">

                {/* --- ÜST KISIM (İLETİŞİM BİLGİLERİ) --- */}
                {/* Mobilde alt alta, büyük ekranda yan yana olacak şekilde grid yapısı */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-b border-gray-100 pb-12">

                    {/* Logo Alanı */}
                    <div className="flex items-center gap-3">
                        <FaCar className="text-4xl text-gray-900" />
                        <div>
                            <h3 className="font-bold text-xl text-gray-900">Car Rental</h3>
                        </div>
                    </div>

                    {/* Adres */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full  bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                            <FaMapMarkerAlt className="text-lg" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Address</p>
                            <p className="text-sm text-gray-500">Oxford Ave. Cary, NC 27511</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                            <FaEnvelope className="text-lg" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Email</p>
                            <p className="text-sm text-gray-500">nwiger@yahoo.com</p>
                        </div>
                    </div>

                    {/* Telefon */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                            <FaPhoneAlt className="text-lg" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Phone</p>
                            <p className="text-sm text-gray-500">+537 547-6401</p>
                        </div>
                    </div>
                </div>

                {/* --- ORTA KISIM (LİNKLER VE AÇIKLAMA) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* 1. Kolon: Açıklama ve Sosyal Medya */}
                    <div className="space-y-4">
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Faucibus faucibus pellentesque dictum turpis. Id pellentesque turpis massa a id iaculis lorem t...
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition">
                                <FaFacebookF />
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition">
                                <FaInstagram />
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition">
                                <FaTwitter />
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    {/* 2. Kolon: Useful Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 text-lg">Useful links</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-orange-500 transition">
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-orange-500 transition">
                                    Contact us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/gallery"
                                    className="hover:text-orange-500 transition">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="hover:text-orange-500 transition">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="hover:text-orange-500 transition">
                                    F.A.Q
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Kolon: Vehicles */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 text-lg">Vehicles</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li>
                                <Link
                                    href="/cars?type=sedan"
                                    className="hover:text-orange-500 transition">
                                    Sedan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cars?type=cabriolet"
                                    className="hover:text-orange-500 transition">
                                    Cabriolet
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cars?type=pickup"
                                    className="hover:text-orange-500 transition">
                                    Pickup
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cars?type=minivan"
                                    className="hover:text-orange-500 transition">
                                    Minivan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cars?type=suv"
                                    className="hover:text-orange-500 transition">
                                    SUV
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Kolon: Download App */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 text-lg">Download App</h4>
                        <div className="space-y-3">
                            {/* App Store Button */}
                            <button className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-lg w-full max-w-45 hover:bg-gray-800 transition cursor-pointer">
                                <FaApple className="text-3xl" />
                                <div className="text-left">
                                    <p className="text-[10px] leading-none">Download on the</p>
                                    <p className="font-bold text-sm">App Store</p>
                                </div>
                            </button>

                            {/* Google Play Button */}
                            <button className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-lg w-full max-w-45 hover:bg-gray-800 transition cursor-pointer">
                                <FaGooglePlay className="text-2xl ml-1" />
                                <div className="text-left ml-1">
                                    <p className="text-[10px] leading-none">GET IT ON</p>
                                    <p className="font-bold text-sm">Google Play</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- ALT KISIM (COPYRIGHT) --- */}
                <div className="border-t border-gray-100 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © Copyright Car Rental 2025. Design by Figma.guru
                    </p>
                </div>

            </div>
        </footer>
    );
}