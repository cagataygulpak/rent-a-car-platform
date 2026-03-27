"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaCar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.warning("Lütfen bilgilerinizi girin. 🔑");
            return;
        }
        setLoading(true);
        try {
            const url = `http://localhost:5261/api/Account/login?email=${formData.email}&password=${formData.password}`;

            // --- GÜNCELLEME BURADA ---
            const res = await fetch(url, {
                method: "POST",
                // BU SATIR ÇOK ÖNEMLİ: Cookie'nin tarayıcıya kaydedilmesini sağlar.
                credentials: "include"
            });

            if (res.ok) {
                const data = await res.json();
                login({
                    username: data.username,
                    role: data.role // Backend'den artık bu geliyor
                });
                setIsSuccess(true);
                toast.success(`Motor çalıştırılıyor... Hoş geldin ${data.username || ""}! 🏎️💨`, { autoClose: 1500 });
                setTimeout(() => { router.push("/"); }, 2000);
            } else {
                if (res.status === 401) toast.error("E-posta veya şifre hatalı!");
                else toast.error("Giriş başarısız oldu.");
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Sunucuya bağlanılamadı!");
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full h-[calc(100vh-4rem)] overflow-hidden bg-white">

            {/* --- SOL TARAF (MODERN İKON TASARIMI) --- */}
            {/* Not: bg-linear-to-br yerine standart Tailwind olan bg-gradient-to-br kullandım, garanti çalışsın diye */}
            <motion.div
                className="hidden lg:flex w-1/2 bg-linear-to-br from-gray-900 to-blue-900 relative items-center justify-center overflow-hidden"
                animate={isSuccess ? { x: "-100%", opacity: 0 } : { x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: "backIn" }}
            >
                {/* Arka Plan Süslemesi (Halkalar) */}
                <div className="absolute w-125 h-125 border border-white/10 rounded-full"></div>
                <div className="absolute w-87.5 h-87.5 border border-white/20 rounded-full"></div>

                {/* Araba İkonu ve Farlar */}
                <div className="relative">
                    <FaCar className="text-white text-[180px] drop-shadow-2xl relative z-10" />

                    {/* SOL FAR */}
                    <motion.div
                        className="absolute bg-yellow-300 rounded-full blur-md z-20"
                        style={{ width: '20px', height: '20px', top: '55%', left: '15%' }}
                        initial={{ opacity: 0 }}
                        animate={isSuccess ? { opacity: [0, 1, 0, 1, 0], scale: [1, 1.5, 1, 1.5, 1] } : { opacity: 0 }}
                        transition={{ duration: 0.8, times: [0, 0.2, 0.4, 0.6, 1] }}
                    />

                    {/* SAĞ FAR */}
                    <motion.div
                        className="absolute bg-yellow-300 rounded-full blur-md z-20"
                        style={{ width: '20px', height: '20px', top: '55%', right: '15%' }}
                        initial={{ opacity: 0 }}
                        animate={isSuccess ? { opacity: [0, 1, 0, 1, 0], scale: [1, 1.5, 1, 1.5, 1] } : { opacity: 0 }}
                        transition={{ duration: 0.8, times: [0, 0.2, 0.4, 0.6, 1] }}
                    />
                </div>

                <motion.div
                    className="absolute bottom-20 text-center"
                    animate={isSuccess ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                >
                    <h2 className="text-4xl font-bold text-white mb-2 tracking-wider">RentACar.</h2>
                    <p className="text-blue-200 text-sm uppercase tracking-[0.3em]">Premium Dashboard</p>
                </motion.div>
            </motion.div>

            {/* --- SAĞ TARAF (FORM) --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 bg-white relative">
                <div className="max-w-md w-full space-y-6">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Giriş Yap</h2>
                        <p className="mt-2 text-gray-500">Hesabınıza erişmek için bilgilerinizi girin.</p>
                    </div>

                    <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400 text-lg" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="E-posta Adresi"
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                                    disabled={loading || isSuccess}
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400 text-lg" />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Şifre"
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                                    disabled={loading || isSuccess}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-500">Şifremi Unuttum?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || isSuccess}
                            className={`w-full py-3 px-4 text-white cursor-pointer font-bold rounded-xl transition duration-300 shadow-lg ${isSuccess ? "bg-green-600" : loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5"}`}
                        >
                            {isSuccess ? "Başarılı! Yönlendiriliyor..." : loading ? "Kontrol Ediliyor..." : "Giriş Yap"}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">
                            Hesabın yok mu? <Link
                                href="/register"
                                className="text-blue-600 font-bold hover:underline">
                                Hemen Kayıt Ol
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}