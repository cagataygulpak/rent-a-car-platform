"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { FaLock, FaCheckCircle, FaPermanent, FaSpinner, FaChevronLeft, FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL'den gelen token ve email parametrelerini yakalıyoruz
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Güvenlik Kontrolü: Linkte token veya email yoksa sayfayı kitle
    useEffect(() => {
        if (!token || !email) {
            toast.error("Geçersiz veya süresi dolmuş şifre sıfırlama bağlantısı! ❌");
        }
    }, [token, email]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!formData.newPassword || !formData.confirmPassword) {
            toast.warning("Lütfen tüm alanları doldurun. 🔑");
            return; // İşlemi burada kes, aşağıya geçmesin
        }


        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Girdiğiniz şifreler birbiriyle uyuşmuyor! 🔄");
            return; // Şifreler farklıysa backend'e istek atmayı engelle
        }

        if (!token || !email) {
            toast.error("Geçersiz işlem talebi.");
            return;
        }

        setLoading(true);
        setLoading(true);
        try {
            const url = `http://localhost:5261/api/Account/reset-password`;

            // URL'den gelen ham parametreleri anlık olarak zorlayarak çekiyoruz (Havada null kalmasınlar)
            const currentEmail = searchParams.get("email") || "";
            const currentToken = searchParams.get("token") || "";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: currentEmail,              // 🛠️ Garantiye alındı
                    token: currentToken,              // 🛠️ Garantiye alındı
                    newPassword: formData.newPassword // Kullanıcının yazdığı yeni şifre
                })
            });

            if (response.ok) {
                setIsSuccess(true);
                toast.success("Şifreniz aslanlar gibi güncellendi! 🔐", { autoClose: 2000 });
                setTimeout(() => { router.push("/login"); }, 2500);
            } else {
                const errorData = await response.json();
                if (Array.isArray(errorData)) {
                    errorData.forEach((err: any) => toast.error(err.description));
                } else {
                    toast.error("Şifre sıfırlanamadı. Kurallara uymuyor olabilir.");
                }
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

                {/* BAŞARI EKRANI (ŞİFRE DEĞİŞTİYSE FORMU GİZLE) */}
                {isSuccess ? (
                    <div className="text-center py-8 space-y-4 animate-scaleUp">
                        <div className="flex justify-center text-green-500">
                            <FaCheckCircle size={64} className="animate-bounce" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">İşlem Başarılı!</h2>
                        <p className="text-gray-500 text-sm">
                            Yeni şifreniz veritabanına başarıyla mühürlendi. Giriş sayfasına yönlendiriliyorsunuz, lütfen bekleyin...
                        </p>
                        <div className="flex justify-center pt-2">
                            <FaSpinner className="animate-spin text-indigo-600 text-2xl" />
                        </div>
                    </div>
                ) : (
                    <>
                        {/* NORMAL FORM EKRANI */}
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Yeni Şifre Belirle</h2>
                            <p className="mt-2 text-gray-500 text-sm">
                                Güvenliğiniz için daha önce kullanmadığınız güçlü bir şifre girin.
                            </p>
                        </div>

                        {(!token || !email) ? (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-center text-sm text-red-600 font-medium">
                                Eksik veya hatalı parametre. Lütfen şifremi unuttum sayfasından yeni bir link üretin.
                            </div>
                        ) : (
                            <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
                                {/* YENİ ŞİFRE */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-400 text-lg" />
                                    </div>
                                    <input
                                        name="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Yeni Şifre"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-12 py-3 text-black bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition" disabled={loading} />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                                        {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                                    </button>
                                </div>

                                {/* ŞİFRE TEKRAR */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-400 text-lg" />
                                    </div>
                                    <input
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Yeni Şifre Tekrar"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-12 py-3 text-black bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition" disabled={loading} />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                                        {showConfirmPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <FaSpinner className="animate-spin" /> Şifre Güncelleniyor...
                                        </>
                                    ) : (
                                        "Şifreyi Güncelle ve Kaydet"
                                    )}
                                </button>
                            </form>
                        )}

                        <div className="text-center border-t border-gray-100 pt-4">
                            <Link href="/login" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-blue-600 font-bold transition-colors">
                                <FaChevronLeft size={10} /> Vazgeç, Giriş Yap
                            </Link>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}