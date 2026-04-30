// services/roleService.ts

const API_URL = "http://localhost:5261/api/Role";

export const roleService = {
    // 1. Tüm Rolleri Getir
    getRoles: async () => {
        const response = await fetch(`${API_URL}/list`, { credentials: "include" });
        if (!response.ok) throw new Error("Roller getirilemedi");
        return response.json();
    },

    // 2. Kullanıcıları ve Rollerini Getir
    getUsers: async () => {
        const response = await fetch(`${API_URL}/users`, { credentials: "include" });
        if (!response.ok) throw new Error("Kullanıcılar getirilemedi");
        return response.json();
    },

    // 3. Yeni Rol Oluştur
    createRole: async (roleName: string) => {
        const response = await fetch(`${API_URL}/create?roleName=${roleName}`, {
            method: "POST",
            credentials: "include"
        });
        if (!response.ok) throw new Error("Rol oluşturulamadı");
        return response;
    },

    // 4. Rolü Güncelle
    updateRole: async (id: string, newName: string) => {
        const response = await fetch(`${API_URL}/update?id=${id}&newName=${newName}`, {
            method: "PUT",
            credentials: "include"
        });
        // EĞER HATA VARSA:
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Rol güncellenemedi");
        }
        return response;
    },

    // 5. Rolü Sil
    deleteRole: async (id: string) => {
        const response = await fetch(`${API_URL}/delete?id=${id}`, {
            method: "DELETE",
            credentials: "include"
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Rol silinemedi");
        }
        return response;
    },

    // 6. Kullanıcıya Rol Ata
    assignRole: async (userId: string, roleName: string) => {
        const response = await fetch(`${API_URL}/assign-role?userId=${userId}&roleName=${roleName}`, {
            method: "POST",
            credentials: "include"
        });

        const data = await response.json();

        // Eğer backend'den hata gelirse (Örn: Son admin silinemez kuralı) bu hatayı fırlat
        if (!response.ok) {
            const errorMessage = typeof data === 'string' ? data : (data.title || "Atama başarısız!");
            throw new Error(errorMessage);
        }

        return data;
    }
};