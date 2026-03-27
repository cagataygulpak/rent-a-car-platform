"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Kullanıcı Tipi
interface User {
    username: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    // Sayfa yenilendiğinde LocalStorage'dan kullanıcıyı geri yükle
    useEffect(() => {
        const initializeUser = async () => {
            try {
                // Sadece tarayıcı ortamındaysak işlem yap
                if (typeof window !== "undefined") {
                    const storedUser = localStorage.getItem("user");

                    if (storedUser) {
                        // JSON.parse hatasına karşı önlem (Try-Catch)
                        setUser(JSON.parse(storedUser));
                    }
                }
            } catch (error) {
                console.error("Kullanıcı verisi okunurken hata:", error);
                localStorage.removeItem("user"); // Bozuk veri varsa temizle
            } finally {
                // Her durumda yükleniyor durumunu kapat
                setLoading(false);
            }
        };

        initializeUser();
    }, []);

    // GİRİŞ FONKSİYONU
    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Kalıcılık için
    };

    // ÇIKIŞ FONKSİYONU
    const logout = async () => {
        try {
            // Backend'deki Cookie'yi sildir
            await fetch("http://localhost:5261/api/Account/logout", {
                method: "POST",
                credentials: "include"
            });

            setUser(null);
            localStorage.removeItem("user");
            toast.info("Çıkış yapıldı 👋");
            router.push("/login");
        } catch (error) {
            console.error("Çıkış hatası", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}