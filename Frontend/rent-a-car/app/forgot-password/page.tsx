"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEnvelope, FaChevronLeft, FaSpinner } from "react-icons/fa";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.warning("Lütfen e-posta adresinizi girin. ✉️");
            return;
        }
        setLoading(true);


        try {
            // Backend'de yazdığımız forgot-password endpoint'ine istek atıyoruz
            const response = await fetch(`http://localhost:5261/api/Account/forgot-password?email=${encodeURIComponent(email)}`, {
                method: "POST"
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Şifre sıfırlama talebi başarıyla oluşturuldu! 🚀");
            } else {
                const errorText = await response.text();
                toast.error(errorText || "Şifre sıfırlama talebi başarısız oldu.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Sunucuya bağlanılamadı!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4 md:px-8">
            <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

                {/* GERİ DÖNÜŞ LİNKİ */}
                <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 font-semibold transition-colors mb-2">
                    <FaChevronLeft size={12} /> Giriş Sayfasına Dön
                </Link>

                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Şifremi Unuttum</h2>
                    <p className="mt-2 text-gray-500 text-sm">
                        Hesabınıza kayıtlı e-posta adresinizi girin. Size şifrenizi sıfırlamanız için bir bağlantı üreteceğiz.
                    </p>
                </div>

                <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-400 text-lg" />
                        </div>
                        <input
                            type="email"
                            placeholder="E-posta Adresi"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin" /> Link Üretiliyor...
                            </>
                        ) : (
                            "Sıfırlama Linki Gönder"
                        )}
                    </button>
                </form>



            </div>
        </div>
    );
}