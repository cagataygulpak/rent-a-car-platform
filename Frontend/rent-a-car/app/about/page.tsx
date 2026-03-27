"use client";

import React, { useState, useRef } from "react";
import { FaPlay, FaCheckCircle, FaApple, FaGooglePlay, FaChevronDown, FaChevronUp, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";

export default function AboutPage() {
    // FAQ (Sık Sorulan Sorular) İçin State
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        // Mantık: "Tıkladığım zaten açık mı?"
        // Açıksa (openFaq === index) -> Kapat (null yap)
        // Değilse -> O numarayı hafızaya at (index yap)
        setOpenFaq(openFaq === index ? null : index);
    };

    const [isHoveringButtons, setIsHoveringButtons] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    // 2. Kontrol çubuğunun ve Overlay'in görünürlüğünü takip eder
    const [showControls, setShowControls] = useState(false);
    // Başlatma Fonksiyonu
    const handleStart = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setShowControls(true); // Kontrolleri aç (Kalıcı olarak)
        }
    };
    // Bitiş Fonksiyonu
    const handleEnd = () => {
        setShowControls(false); // Sadece video biterse kontrolleri kapat ve başa dön
        if (videoRef.current) videoRef.current.currentTime = 0;
    };

    const testimonials = [
        {
            id: 1,
            name: "Ahmet Yılmaz",
            city: "İstanbul",
            comment: "Harika bir deneyimdi! Araç tertemizdi ve personel çok ilgiliydi. Kesinlikle tekrar kiralayacağım.",
            image: "/images/person-1.png"
        },
        {
            id: 2,
            name: "Ayşe Demir",
            city: "Ankara",
            comment: "İş seyahatim için kiraladım, süreç çok hızlıydı. Hiçbir sorun yaşamadım, teşekkürler.",
            image: "/images/person-2.png"
        },
        {
            id: 3,
            name: "Mehmet Kaya",
            city: "İzmir",
            comment: "Fiyatlar piyasaya göre çok uygun. Araç konforluydu, ailece çok memnun kaldık.",
            image: "/images/person-3.png"
        }
    ];

    const questionsAndAnswers = [
        { q: "Nasıl çalışır?", a: "Aracınızı seçin, tarihleri belirleyin ve anında rezerve edin. Ofisimizden veya adresinizden teslim alabilirsiniz." },
        { q: "Kredi kartı olmadan kiralayabilir miyim?", a: "Güvenlik prosedürlerimiz gereği, ana sürücünün adına kayıtlı bir kredi kartı gereklidir." },
        { q: "Yaş sınırı nedir?", a: "Çoğu araç grubu için minimum yaş sınırı 21'dir ve en az 1 yıllık ehliyet gereklidir." },
        { q: "Sigorta neleri kapsar?", a: "Temel sigorta fiyata dahildir. Ek koruma paketleri ile muafiyetsiz güvence satın alabilirsiniz." }];

    return (
        <div className="bg-white pb-20">
            {/* --- 2. GİRİŞ & VİDEO BÖLÜMÜ --- */}
            <div className="container mx-auto px-6 lg:px-12 mb-20 pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Sol: Başlık */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            Sürüşün olağanüstü hissettirdiği yerdesiniz.
                        </h2>
                        <p className="text-gray-500 mt-4">
                            Müşterilerimize en iyi deneyimi sunmak için buradayız. Geniş araç filomuz ve 7/24 desteğimizle yolculuğunuz güvende.
                        </p>
                    </div>

                    {/* Sağ: Özellikler Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-gray-900">Çeşitli Markalar</h4>
                            <p className="text-sm text-gray-500 mt-1">Dünyanın en iyi markalarıyla çalışıyoruz, seçenekleriniz sınırsız.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Harika Destek</h4>
                            <p className="text-sm text-gray-500 mt-1">Yol yardım ekibimiz her an yanınızda.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Maksimum Özgürlük</h4>
                            <p className="text-sm text-gray-500 mt-1">Kilometre sınırı olmadan yolun tadını çıkarın.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Esneklik</h4>
                            <p className="text-sm text-gray-500 mt-1">Rezervasyonunuzu son ana kadar değiştirebilirsiniz.</p>
                        </div>
                    </div>
                </div>

                {/* Video Alanı */}
                <div className="relative w-full h-64 md:h-96 lg:h-150 rounded-3xl overflow-hidden shadow-xl mb-12 cursor-pointer">
                    <video
                        ref={videoRef}
                        playsInline
                        // 👇 KRİTİK DEĞİŞİKLİK: 
                        // Controls artık anlık durmalara (isPlaying) değil, genel moda (showControls) bağlı.
                        controls={showControls}
                        onEnded={handleEnd}
                        onPlay={() => setShowControls(true)}
                        className={`w-full h-full object-cover transition duration-700`}
                    >
                        <source src="/videos/Car_Rental_Website_Promotional_Video.mp4" type="video/mp4" />
                    </video>
                    <div
                        className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${showControls ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                    >
                        <button
                            onClick={handleStart}
                            className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl hover:scale-110 transition shadow-lg"
                        >
                            <FaPlay className="ml-1" />
                        </button>
                    </div>
                </div>

                {/* İstatistikler */}
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center">
                    <div>
                        <h3 className="text-4xl font-bold text-indigo-600">20k+</h3>
                        <p className="text-gray-600 font-medium">Mutlu Müşteri</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-indigo-600">540+</h3>
                        <p className="text-gray-600 font-medium">Araç Sayısı</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-indigo-600">25+</h3>
                        <p className="text-gray-600 font-medium">Yıllık Tecrübe</p>
                    </div>
                </div>
            </div>

            {/* --- 3. "UNUTULMAZ ANILAR" BÖLÜMÜ --- */}
            <div className="container mx-auto px-6 lg:px-12 mb-20">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Sol: Yazı */}
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Yolda unutulmaz anıların kilidini açın</h2>
                        <p className="text-gray-500 mb-6">
                            Sadece bir araç kiralamıyorsunuz, özgürlüğünüzü kiralıyorsunuz. Ailenizle, arkadaşlarınızla veya tek başınıza çıkacağınız yolculuklar için en iyi yol arkadaşınız biziz.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FaCheckCircle className="text-indigo-600 mt-1 shrink-0" />
                                <span className="text-gray-600">Gizli ücret yok, her şey şeffaf.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaCheckCircle className="text-indigo-600 mt-1 shrink-0" />
                                <span className="text-gray-600">7/24 Yol yardımı ve müşteri desteği.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaCheckCircle className="text-indigo-600 mt-1 shrink-0" />
                                <span className="text-gray-600">Ücretsiz iptal ve değişiklik imkanı.</span>
                            </li>
                        </ul>
                    </div>
                    {/* Sağ: Resim */}
                    <div className="lg:w-1/2 h-100 relative">
                        <Image
                            src="/images/car-photo-with-sunset.png"
                            alt="Happy Driver"
                            className="w-full h-full object-cover rounded-3xl shadow-lg relative"
                            fill
                        />
                    </div>
                </div>
            </div>

            {/* --- 4. APP DOWNLOAD BANNER --- */}
            <div className="container mx-auto px-6 lg:px-12 mb-20 mt-32">
                <div className="bg-indigo-600 rounded-[40px] relative flex flex-col md:flex-row items-center overflow-visible">
                    {/* Arka Plan Deseni */}
                    <div className="absolute inset-0 rounded-[40px] overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/tire.png')] mix-blend-overlay"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    {/* --- SOL TARA: TELEFON GÖRSELİ --- */}
                    <div className="w-full md:w-5/12 relative z-10 flex justify-center md:justify-start md:pl-12">
                        <div
                            className={`-mt-20 md:-mt-30 w-64 md:w-80 transition-transform duration-500 ease-out ${isHoveringButtons ? "-translate-y-6" : ""}`}
                        >
                            <Image
                                src="/images/phone.svg"
                                alt="Mobile App"
                                width={320}
                                height={640}
                                className="w-full h-auto drop-shadow-2xl object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* --- SAĞ TARAF: YAZI VE BUTONLAR --- */}
                    <div className="w-full md:w-7/12 p-8 md:p-16 text-center md:text-left text-white z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                            Download our app
                        </h2>
                        <p className="text-indigo-100 mb-8 text-sm md:text-base leading-relaxed opacity-90 max-w-lg mx-auto md:mx-0">
                            Turpis morbi enim nisi pulvinar leo dui tellus. Faucibus egestas semper diam rutrum dictumst ut donec. Nisi nisi morbi vel in vulputate.
                        </p>

                        <div
                            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                            onMouseEnter={() => setIsHoveringButtons(true)}  // Mouse girdi -> Telefon kalksın
                            onMouseLeave={() => setIsHoveringButtons(false)} // Mouse çıktı -> Telefon insin
                        >
                            {/* App Store Button */}
                            <button className="bg-white text-gray-900 px-6 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition shadow-lg min-w-45 group cursor-pointer">
                                <FaApple className="text-3xl group-hover:scale-110 transition duration-300" />
                                <div className="text-left leading-tight">
                                    <span className="text-[10px] block font-bold text-gray-500 uppercase">Download on the</span>
                                    <span className="text-lg font-bold">App Store</span>
                                </div>
                            </button>

                            {/* Google Play Button */}
                            <button className="bg-white text-gray-900 px-6 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition shadow-lg min-w-45 group cursor-pointer">
                                <FaGooglePlay className="text-2xl group-hover:scale-110 transition duration-300" />
                                <div className="text-left leading-tight">
                                    <span className="text-[10px] block font-bold text-gray-500 uppercase">GET IT ON</span>
                                    <span className="text-lg font-bold">Google Play</span>
                                </div>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- 5. YORUMLAR (TESTIMONIALS) --- */}
            <div className="container mx-auto px-6 lg:px-12 mb-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Müşterilerimizden Yorumlar</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Yorum Kartı 1 */}
                    {testimonials.map((person) => (
                        <div
                            key={person.id}
                            className="bg-gray-50 p-8 rounded-2xl relative">
                            <p className="text-gray-600 italic mb-6">
                                {person.comment}
                            </p>
                            <div className="flex items-center gap-4">
                                <Image
                                    src={person.image}
                                    alt={person.name}
                                    width={96}
                                    height={96}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h5 className="font-bold text-gray-900">{person.name}</h5>
                                    <span className="text-xs text-gray-500">{person.city}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- 6. FAQ (SIK SORULAN SORULAR) --- */}
            <div className="container mx-auto px-6 lg:px-12 mb-20 max-w-4xl">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Sık Sorulan Sorular</h2>
                <div className="space-y-4">
                    {questionsAndAnswers.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition"
                            >
                                <span className="font-bold text-gray-900 text-left">{faq.q}</span>
                                {openFaq === index ? <FaChevronUp className="text-indigo-600" /> : <FaChevronDown className="text-gray-400" />}
                            </button>
                            {/* Açılan Kısım */}
                            <div
                                className={`px-6 bg-gray-50 text-gray-600 overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-40 py-6" : "max-h-0 py-0"}`}>
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- 7. BOTTOM CTA (ALT ÇAĞRI) --- */}
            <div className="container mx-auto px-6 lg:px-12">
                <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden text-white">
                    <div className="z-10 md:w-1/2">
                        <h2 className="text-3xl font-bold mb-4">Araba mı arıyorsunuz?</h2>
                        <p className="text-indigo-100 mb-6">Bize hemen ulaşın, size en uygun aracı ayırtalım.</p>
                        <div className="flex items-center gap-3 text-2xl font-bold">
                            <FaPhoneAlt /> +90 537 547 6401
                        </div>
                        <button className="mt-8 bg-amber-500 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-600 transition shadow-lg hover:shadow-xl cursor-pointer">
                            Hemen Kirala
                        </button>
                    </div>

                    {/* Araba Resmi (Sağ Alt) */}
                    <div className="md:w-1/2 mt-8 md:mt-0 relative z-10 flex justify-end">
                        <Image
                            src="/images/car-cta.png"
                            alt="Car CTA"
                            width={1200}
                            height={800}
                            quality={100}
                            className="w-full md:w-[120%] max-w-none object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}