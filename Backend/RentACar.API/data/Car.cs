namespace RentACar.API.data;

public class Car
{
    public int Id { get; set; }

    // --- Temel Bilgiler ---
    public string? Brand { get; set; }        // Marka (Örn: BMW)
    public string? Model { get; set; }       // Model (Örn: 5.20i)
    public int Year { get; set; }           // Yıl
    public string? Color { get; set; }       // Renk

    // --- Teknik Özellikler ---
    public string? Transmission { get; set; } // Vites (Otomatik, Manuel)
    public string? FuelType { get; set; }     // Yakıt (Benzin, Dizel, Hibrit)
    public string? BodyType { get; set; }     // Kasa (Sedan, SUV, Hatchback)
    public int Kilometer { get; set; }       // Anlık KM bilgisi
    public short SeatCount { get; set; }     // Koltuk Sayısı (Örn: 5)

    // --- Kiralama Bilgileri ---
    public int PricePerDay { get; set; } // Günlük Ücret
    public double DepositPrice { get; set; } // Depozito Ücreti
    public bool IsAvailable { get; set; } = true; // Kiralanabilir mi?
    public string? PlateNumber { get; set; }  // Plaka (34 ABC 123) - Admin için

    // --- Görsel ve Açıklama ---
    public string? ImageUrl { get; set; }     // Kapak fotoğrafı yolu
    public string? Description { get; set; }  // "Sahibinden temiz, sigara içilmemiş..."

    // --- Kurallar (Opsiyonel ama önerilir) ---
    public int MinFindexScore { get; set; }  // Min Findex puanı (Örn: 1200)
    public int MinDriverAge { get; set; }    // Min Sürücü Yaşı (Örn: 21)
}