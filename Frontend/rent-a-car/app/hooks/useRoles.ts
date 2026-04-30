import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { roleService } from "../services/roleService"; // 👈 Servis katmanını bağladık

// Tipler
export interface Role {
    id: string;
    name: string;
}

export interface User {
    id: string;
    userName: string;
    email: string;
    roles: string[];
}

export function useRoles() {
    // --- BÜTÜN HAFIZA (STATE) BURADA ---
    const [roles, setRoles] = useState<Role[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [newRoleName, setNewRoleName] = useState("");
    const [selectedRoleUpdate, setSelectedRoleUpdate] = useState("");
    const [updateRoleName, setUpdateRoleName] = useState("");
    const [selectedRoleDelete, setSelectedRoleDelete] = useState("");
    const [assignUserId, setAssignUserId] = useState("");
    const [assignRoleName, setAssignRoleName] = useState("");

    // --- BÜTÜN MANTIK (LOGIC) BURADA ---
    const fetchData = async () => {
        try {
            const rolesData: Role[] = await roleService.getRoles();
            const usersData: User[] = await roleService.getUsers();

            rolesData.sort((a, b) => a.name.localeCompare(b.name));
            setRoles(rolesData);
            setUsers(usersData);
        } catch (error) {
            console.error(error);
            toast.error("Veriler yüklenemedi!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async () => {
        if (!newRoleName.trim()) return toast.warning("Rol adı yazın!");

        const roleExists = roles.some(r => r.name.trim().toLowerCase() === newRoleName.trim().toLowerCase());
        if (roleExists) return toast.warning("Bu rol zaten mevcut! Farklı bir isim deneyin.");

        try {
            await roleService.createRole(newRoleName);
            toast.success("Rol eklendi ✅");
            setNewRoleName("");
            fetchData();
        } catch (error) {
            toast.error("Hata oluştu veya rol zaten var.");
        }
    };

    const handleUpdate = async () => {
        if (!selectedRoleUpdate || !updateRoleName) return toast.warning("Rol seçin ve yeni ad girin!");
        try {
            await roleService.updateRole(selectedRoleUpdate, updateRoleName);
            toast.success("Rol güncellendi 🔄");
            setUpdateRoleName("");
            fetchData();
        } catch (error: any) {
            toast.error(error.message || "Hata oluştu!");
        }
    };

    const handleDelete = async () => {
        if (!selectedRoleDelete) return toast.warning("Silinecek rolü seçin!");
        if (!window.confirm("Bu rolü silmek istediğine emin misin?")) return;

        try {
            await roleService.deleteRole(selectedRoleDelete);
            toast.success("Rol silindi 🗑️");
            setSelectedRoleDelete("");
            fetchData();
        } catch (error: any) {
            toast.error(error.message || "Hata oluştu!");
        }
    };

    const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setAssignUserId(selectedId);
        const selectedUser = users.find(u => u.id === selectedId);
        setAssignRoleName(selectedUser && selectedUser.roles.length > 0 ? selectedUser.roles[0] : "");
    };

    const handleAssign = async () => {
        if (!assignUserId || !assignRoleName) return toast.warning("Kullanıcı ve Rol seçmelisin!");
        try {
            await roleService.assignRole(assignUserId, assignRoleName);
            toast.success("Rol başarıyla atandı! 🎭");
            setAssignUserId("");
            setAssignRoleName("");
            fetchData();
        } catch (error: any) {
            toast.error(error.message || "Atama başarısız!");
        }
    };

    // --- ARAYÜZE (KAPORTAYA) NELERİ GÖNDERECEĞİZ? ---
    return {
        roles, users, loading,
        newRoleName, setNewRoleName,
        selectedRoleUpdate, setSelectedRoleUpdate,
        updateRoleName, setUpdateRoleName,
        selectedRoleDelete, setSelectedRoleDelete,
        assignUserId, handleUserSelect,
        assignRoleName, setAssignRoleName,
        handleCreate, handleUpdate, handleDelete, handleAssign
    };
}