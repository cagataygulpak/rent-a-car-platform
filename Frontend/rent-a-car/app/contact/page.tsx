import Image from 'next/image';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock, FaChevronDown, FaCalendarAlt, FaCar } from 'react-icons/fa';
import BrandLogos from '@/widgets/BrandLogos';


export default function ContactPage() {

    // Blog verileri (Mock Data)
    const blogPosts = [
        {
            id: 1,
            title: "How To Choose The Right Car",
            category: "News",
            date: "12 April 2024",
            image: "/images/blog1.jpg" // Buraya kendi resim yolunu koymalısın
        },
        {
            id: 2,
            title: "Which plan is right for me?",
            category: "News",
            date: "12 April 2024",
            image: "/images/blog2.jpg"
        },
        {
            id: 3,
            title: "Enjoy Speed, Choice & Total Control",
            category: "News",
            date: "12 April 2024",
            image: "/images/blog3.jpg"
        }
    ];

    return (
        <div className="bg-white min-h-screen pt-32 pb-20"> {/* Header payı için pt-32 */}
            <div className="container mx-auto px-6 lg:px-12">
                {/* --- 2. BOOKING FORM & HERO IMAGE SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                    {/* SOL: Mor Rezervasyon Kutusu */}
                    <div className="bg-indigo-900 rounded-[30px] p-8 md:p-12 text-white shadow-2xl h-full flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-2">Book your car</h2>
                        <p className="text-indigo-200 mb-8 text-sm">Size en uygun aracı hemen kiralayın.</p>
                        <form className="space-y-5">
                            {/* 1. Car Type (Select) */}
                            <div>
                                <label className="block text-indigo-200 text-xs font-bold mb-2 ml-1 uppercase tracking-wide">Araç Tipi</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-orange-400 transition z-10">
                                        <FaCar />
                                    </div>
                                    <select className="w-full bg-white/10 border border-white/10 backdrop-blur-md rounded-xl pl-12 pr-10 py-4 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white/20 transition text-white cursor-pointer font-medium">
                                        <option className="bg-indigo-900">Araç Tipi Seçiniz</option>
                                        <option className="bg-indigo-900">Sedan</option>
                                        <option className="bg-indigo-900">SUV</option>
                                        <option className="bg-indigo-900">Sport</option>
                                    </select>
                                    <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-300 text-xs pointer-events-none" />
                                </div>
                            </div>

                            {/* 2. Rental & Return Place (Grid) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Alış Yeri */}
                                <div>
                                    <label className="block text-indigo-200 text-xs font-bold mb-2 ml-1 uppercase tracking-wide">Alış Yeri</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-orange-400 transition z-10">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <select className="w-full bg-white/10 border border-white/10 backdrop-blur-md rounded-xl pl-12 pr-10 py-4 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white/20 transition text-white cursor-pointer font-medium">
                                            <option className="bg-indigo-900">Şehir Seçiniz</option>
                                            <option className="bg-indigo-900">New York</option>
                                            <option className="bg-indigo-900">London</option>
                                            <option className="bg-indigo-900">Istanbul</option>
                                        </select>
                                        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-300 text-xs pointer-events-none" />
                                    </div>
                                </div>

                                {/* İade Yeri */}
                                <div>
                                    <label className="block text-indigo-200 text-xs font-bold mb-2 ml-1 uppercase tracking-wide">İade Yeri</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-orange-400 transition  z-10">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <select className="w-full bg-white/10 border border-white/10 backdrop-blur-md rounded-xl pl-12 pr-10 py-4 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white/20 transition text-white cursor-pointer font-medium">
                                            <option className="bg-indigo-900">Alış ile Aynı</option>
                                            <option className="bg-indigo-900">Farklı Konum</option>
                                        </select>
                                        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-300 text-xs pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* 3. Dates (Grid) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Alış Tarihi */}
                                <div>
                                    <label className="block text-indigo-200 text-xs font-bold mb-2 ml-1 uppercase tracking-wide">Alış Tarihi</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-orange-400 transition  z-10">
                                            <FaCalendarAlt />
                                        </div>
                                        <input
                                            type="date"
                                            className="w-full bg-white/10 border border-white/10 backdrop-blur-md rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white/20 transition font-medium uppercase calendar-picker-white"
                                        />
                                    </div>
                                </div>

                                {/* İade Tarihi */}
                                <div>
                                    <label className="block text-indigo-200 text-xs font-bold mb-2 ml-1 uppercase tracking-wide">İade Tarihi</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-orange-400 transition  z-10">
                                            <FaCalendarAlt />
                                        </div>
                                        <input
                                            type="date"
                                            className="w-full bg-white/10 border border-white/10 backdrop-blur-md rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white/20 transition font-medium uppercase calendar-picker-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition duration-300 mt-2 text-lg cursor-pointer">
                                Hemen Kirala
                            </button>
                        </form>
                    </div>

                    {/* SAĞ: Görsel */}
                    <div className="relative w-full h-full min-h-125 rounded-[30px] overflow-hidden shadow-2xl">
                        <Image
                            src="/images/contact-car.png"
                            alt="Car Rental Contact"
                            fill
                            className="object-cover object-center hover:scale-105 transition duration-700"
                            priority
                        />
                    </div>
                </div>

                {/* --- 3. CONTACT INFO ICONS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {/* Address */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0">
                            <FaMapMarkerAlt className="text-xl" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">Address</h3>
                            <p className="text-gray-500 text-xs font-medium">Oxford Ave. Cary, NC 27511</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0">
                            <FaEnvelope className="text-xl" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">Email</h3>
                            <p className="text-gray-500 text-xs font-medium">rwigan@yahoo.com</p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0">
                            <FaPhoneAlt className="text-xl" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">Phone</h3>
                            <p className="text-gray-500 text-xs font-medium">+527 547-6401</p>
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0">
                            <FaClock className="text-xl" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">Opening hours</h3>
                            <p className="text-gray-500 text-xs font-medium">Sun-Mon: 10am - 10pm</p>
                        </div>
                    </div>
                </div>

                {/* --- 4. LATEST BLOG POSTS --- */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Latest blog posts & news</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <div key={post.id} className="group cursor-pointer">
                                <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition duration-300">
                                    {/* Eğer resim yoksa gri bir kutu göster */}
                                    <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400">
                                        {/* <Image src={post.image} fill className="object-cover" /> bu satırı resimler gelince aç */}
                                        <span className="text-sm">Image Placeholder</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-xs text-gray-400">
                                    {post.category} / {post.date}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- 5. BRAND LOGOS (FOOTER STRIP) --- */}
                <BrandLogos />

            </div>
        </div>
    );
}