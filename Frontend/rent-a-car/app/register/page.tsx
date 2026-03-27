"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha"; // 1. Paketi içeri aldık

interface IdentityError { code: string; description: string; }

export default function RegisterPage() {
    const router = useRouter();
    // Captcha'yı resetlemek için referans (Hata alırsak kutu sıfırlansın diye)
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const [loading, setLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null); // 2. Token state'i
    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Kutucuğa tıklanınca bu fonksiyon çalışır
    const onCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // --- Validasyonlar ---
        if (!formData.username || !formData.email || !formData.password) {
            toast.warning("Lütfen tüm alanları doldurun! 📝"); return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error("Şifreler eşleşmiyor! ❌"); return;
        }
        if (formData.password.length < 6) {
            toast.warning("Şifre en az 6 karakter olmalı! 🛡️"); return;
        }

        // --- 3. ROBOT KONTROLÜ (Token yoksa işlem yapma) ---
        if (!captchaToken) {
            toast.warning("Lütfen robot olmadığınızı doğrulayın! 🤖");
            return;
        }

        setLoading(true);
        try {
            // 4. Token'ı Backend'e gönderiyoruz (captchaToken parametresi eklendi)
            const url = `http://localhost:5261/api/Account/register?username=${formData.username}&email=${formData.email}&password=${formData.password}&captchaToken=${captchaToken}`;

            const res = await fetch(url, { method: "POST" });

            if (res.ok) {
                toast.success("Kayıt Başarılı! Giriş sayfasına yönlendiriliyorsunuz... 🚀");
                setTimeout(() => { router.push("/login"); }, 2000);
            } else {
                const errorData = await res.json();

                // Backend'den gelen "RobotDetected" hatasını yakala
                if (errorData.code === "RobotDetected") {
                    toast.error(errorData.description);
                    recaptchaRef.current?.reset(); // Kutuyu sıfırla ki tekrar denesin
                    setCaptchaToken(null);
                }
                else if (Array.isArray(errorData)) {
                    errorData.forEach((err: IdentityError) => { toast.error(err.description); });
                } else if (errorData.message) {
                    toast.error(errorData.message);
                } else {
                    toast.error("Kayıt işlemi başarısız oldu.");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Sunucuya ulaşılamadı!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full h-[calc(100vh-4rem)] overflow-hidden bg-white">

            {/* --- SOL TARAF --- */}
            <div className="hidden lg:flex w-1/2 bg-cover bg-center relative"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center p-12">
                        <h1 className="text-5xl font-bold mb-6">RentACar.</h1>
                        <p className="text-xl font-light">Hayalindeki araca bir adım uzaktasın.</p>
                    </div>
                </div>
            </div>

            {/* --- SAĞ TARAF --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 bg-white overflow-y-auto">
                <div className="max-w-md w-full space-y-6 py-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Aramıza Katıl</h2>
                        <p className="mt-2 text-gray-500">Hızlıca hesap oluştur ve kiralamaya başla.</p>
                    </div>

                    <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-3">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><FaUser className="text-gray-400 text-lg" /></div>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Kullanıcı Adı"
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 transition" disabled={loading} />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><FaEnvelope className="text-gray-400 text-lg" /></div>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="E-posta Adresi"
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 transition" disabled={loading} />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><FaLock className="text-gray-400 text-lg" /></div>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Şifre"
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 transition" disabled={loading} />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><FaCheckCircle className="text-gray-400 text-lg" /></div>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Şifre Tekrar"
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 transition" disabled={loading} />
                            </div>
                        </div>

                        {/* --- 5. RECAPTCHA KUTUSU --- */}
                        {/* scale-90 ile biraz küçülttük ki mobilde taşmasın */}
                        <div className="flex justify-center scale-90 origin-center my-2">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey="6LeFvDUsAAAAANSuZYcvpw5hiEPvS2Xxj-pHt9wn" // <--- 🔑 ANAHTARINI BURAYA YAPIŞTIR
                                onChange={onCaptchaChange}
                            />
                        </div>

                        <button type="submit" disabled={loading}
                            className={`w-full py-3 px-4 text-white font-bold cursor-pointer rounded-xl transition duration-300 shadow-lg ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5"}`}
                        >
                            {loading ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">
                            Zaten hesabın var mı? <Link href="/login" className="text-blue-600 font-bold hover:underline">Giriş Yap</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}