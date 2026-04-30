// services/carService.ts

// Backend API adresimiz
const API_URL = "http://localhost:5261/api/Cars";

export const carService = {

    getAll: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Araçlar getirilemedi");
        return response.json();
    },

    getById: async (id: number) => {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Araç bulunamadı");
        return response.json();
    },


    create: async (carData: any) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carData),
            credentials: "include", // 👈 KRİTİK NOKTA: Giriş biletini (Cookie) backend'e taşır!
        });
        if (!response.ok) throw new Error("Araç eklenirken bir hata oluştu");
        return response.json();
    },

    update: async (id: number, carData: any) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carData),
            credentials: "include",
        });
        if (!response.ok) throw new Error("Araç güncellenemedi");
        return response.json();
    },

    delete: async (id: number) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (!response.ok) throw new Error("Araç silinemedi");
        return response.text(); // Silme işlemi genelde sadece onay mesajı döner
    }
};