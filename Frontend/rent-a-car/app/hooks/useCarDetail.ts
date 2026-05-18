import { useState, useEffect } from "react";
import { carService } from "@/app/services/carService";

interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    color: string;
    transmission: string;
    fuelType: string;
    bodyType: string;
    kilometer: number;
    seatCount: number;
    pricePerDay: number;
    depositPrice: number;
    isAvailable: boolean;
    plateNumber: string;
    imageUrl: string;
    description: string;
    minFindexScore: number;
    minDriverAge: number;
}

export const useCarDetail = (id: number) => {
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchCarDetail = async () => {
            try {
                setLoading(true);
                const data = await carService.getById(id);
                setCar(data);
            } catch (err: any) {
                setError(err.message || "Araç detayları yüklenemedi.");
            } finally {
                setLoading(false);
            }
        };

        fetchCarDetail();
    }, [id]);

    return { car, loading, error };
};