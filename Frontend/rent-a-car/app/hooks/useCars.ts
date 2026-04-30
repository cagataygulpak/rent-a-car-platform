
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { carService } from "@/app/services/carService";



export const useCars = () => {
    // --- 1. STATE YÖNETİMİ (Hafıza) ---
    const [cars, setCars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Güncelleme Modalı İçin
    const [editingCar, setEditingCar] = useState<any | null>(null);

    // Yeni Ekleme Modalı İçin
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCarData, setNewCarData] = useState({
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        color: "",
        transmission: "Otomatik", // Default değer
        fuelType: "Benzin",      // Default değer
        bodyType: "Sedan",       // Default değer
        kilometer: 0,
        seatCount: 5,
        pricePerDay: 0,
        depositPrice: 0,
        isAvailable: true,
        plateNumber: "",
        imageUrl: "",
        description: "",
        minFindexScore: 0,
        minDriverAge: 18
    });

    // --- 2. VERİLERİ GETİR (READ) ---
    const fetchCars = async () => {
        setLoading(true);
        try {
            const data = await carService.getAll(); // Servisteki getAll'u çağırır
            setCars(data);
        } catch (error: any) {
            toast.error(error.message || "Araçlar yüklenemedi!");
        } finally {
            setLoading(false);
        }
    };

    // Sayfa yüklendiğinde araçları çek
    useEffect(() => {
        fetchCars();
    }, []);

    // --- 3. ARAÇ SİL (DELETE) ---
    const handleDelete = async (id: number) => {
        if (!window.confirm("Bu aracı silmek istediğine emin misin?")) return;

        try {
            await carService.delete(id); // Servisteki delete'i çağırır
            toast.success("Araç başarıyla silindi 🗑️");
            fetchCars(); // Listeyi tazele
        } catch (error: any) {
            toast.error(error.message || "Silme işlemi başarısız!");
        }
    };

    // --- 4. ARAÇ GÜNCELLE (UPDATE) ---
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCar) return;

        try {
            // Servisteki update(id, data) metodunu çağırır
            await carService.update(editingCar.id, editingCar);
            toast.success("Araç bilgileri güncellendi 🔄");
            setEditingCar(null); // Modalı kapat
            fetchCars(); // Listeyi tazele
        } catch (error: any) {
            toast.error(error.message || "Güncelleme sırasında hata oluştu!");
        }
    };

    // --- 5. YENİ ARAÇ EKLE (CREATE) ---
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await carService.create(newCarData); // Servisteki create'i çağırır
            toast.success("Yeni araç başarıyla eklendi 🚗");
            setIsAddModalOpen(false); // Modalı kapat
            setNewCarData({
                brand: "",
                model: "",
                year: new Date().getFullYear(),
                color: "",
                transmission: "Otomatik",
                fuelType: "Benzin",
                bodyType: "Sedan",
                kilometer: 0,
                seatCount: 5,
                pricePerDay: 0,
                depositPrice: 0,
                isAvailable: true,
                plateNumber: "",
                imageUrl: "",
                description: "",
                minFindexScore: 0,
                minDriverAge: 18
            }); // Formu sıfırla
            fetchCars(); // Listeyi tazele
        } catch (error: any) {
            toast.error(error.message || "Araç eklenemedi!");
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5261/api/Cars/upload-image", {
                method: "POST",
                body: formData
                // Eğer login şartı varsa: credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                // MSSQL'e gidecek olan 'newCarData' içindeki imageUrl'i güncelliyoruz
                setNewCarData({ ...newCarData, imageUrl: data.url });
                toast.success("Fotoğraf başarıyla yüklendi!");
            }
        } catch (error) {
            toast.error("Fotoğraf yüklenirken hata oluştu.");
        }
    };

    const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !editingCar) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5261/api/Cars/upload-image", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                // BURASI FARKLI: newCarData yerine editingCar güncelleniyor
                setEditingCar({ ...editingCar, imageUrl: data.url });
                toast.success("Yeni fotoğraf başarıyla yüklendi! 📸");
            }
        } catch (error) {
            toast.error("Fotoğraf yüklenirken hata oluştu.");
        }
    };

    // Kaportaya (View kısmına) gönderilecek paket
    return {
        cars,
        loading,
        editingCar,
        setEditingCar,
        isAddModalOpen,
        setIsAddModalOpen,
        newCarData,
        setNewCarData,
        handleDelete,
        handleUpdate,
        handleAdd,
        fetchCars,
        handleImageUpload,
        handleEditImageUpload
    };
};