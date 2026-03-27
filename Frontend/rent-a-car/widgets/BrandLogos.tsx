import { SiToyota, SiFord, SiMercedes, SiJeep, SiBmw, SiAudi } from 'react-icons/si';

export default function BrandLogos() {
    return (
        <div className="bg-gray-50 rounded-[40px] px-8 py-12 flex flex-wrap justify-between items-center gap-8 text-gray-800 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            <SiToyota className="text-5xl hover:scale-110 transition duration-300 cursor-pointer" />
            <SiFord className="text-5xl hover:scale-110 transition duration-300 cursor-pointer" />
            <SiMercedes className="text-4xl hover:scale-110 transition duration-300 cursor-pointer" />
            <SiJeep className="text-5xl hover:scale-110 transition duration-300 cursor-pointer" />
            <SiBmw className="text-4xl hover:scale-110 transition duration-300 cursor-pointer" />
            <SiAudi className="text-4xl hover:scale-110 transition duration-300 cursor-pointer" />
        </div>
    );
}