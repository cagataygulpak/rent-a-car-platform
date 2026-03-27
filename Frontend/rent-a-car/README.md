# 🚗 Rent A Car - Full-Stack Araç Kiralama Platformu

Modern web mimarileri (Clean Architecture, RESTful API) kullanılarak geliştirilmiş; güvenli, SEO uyumlu ve ölçeklenebilir araç kiralama ve yönetim platformu. Bu proje, müşteriler için yüksek performanslı bir vitrin sunarken, yöneticiler için dinamik ve yetki tabanlı bir kontrol paneli barındırır.

## 💻 Kullanılan Teknolojiler

**Backend (Sunucu Tarafı):**
* C# & .NET Core Web API
* Entity Framework Core (Code-First)
* MS SQL Server
* ASP.NET Core Identity
* JWT (JSON Web Token) & HTTP-Only Cookies Authentication

**Frontend (İstemci Tarafı):**
* React.js & Next.js (App Router)
* TypeScript
* Tailwind CSS
* React Toastify

## ✨ Temel Özellikler ve Mimari Yapı

* **Hibrit Rendering Mimarisi:** Müşteri tarafı sayfalarında arama motoru optimizasyonu (SEO) ve hızlı yükleme için Next.js **Server-Side Rendering (SSR)** kullanılmıştır. Admin panelinde ise sayfa yenilenmeden, anlık tepki veren akıcı bir deneyim için **Client-Side Rendering (CSR)** tercih edilmiştir.
* **Gelişmiş Kimlik ve Yetki Yönetimi (RBAC):** Admin ve User rolleri ile sayfa ve API bazlı güvenlik sağlanmıştır. JWT token'ları güvenlik amacıyla Local Storage yerine HTTP-Only Cookie'lerde taşınmaktadır.
* **Özel İş Kuralları (Business Logic):** Tekil rol atama (Single Role Policy) ve sistemdeki son yöneticinin yanlışlıkla silinmesini/yetkisinin alınmasını engelleyen Last Admin Protection algoritmaları entegre edilmiştir.
* **Otomatik Veri Tohumlama (Data Seeding):** Uygulama ilk kez ayağa kaldırıldığında veritabanını denetleyen ve eksik temel rolleri otomatik olarak oluşturan sistem mevcuttur.
* **Modern UI/UX:** Tailwind CSS ile tamamen mobil uyumlu (Responsive) ve akıllı navigasyon bileşenleri tasarlanmıştır.

## 🚀 Kurulum ve Çalıştırma

Projeyi lokal ortamınızda çalıştırmak için aşağıdaki adımları sırasıyla izleyebilirsiniz.

### Ön Koşullar
* .NET SDK (v8.0 veya üzeri)
* Node.js (v18.0 veya üzeri)
* MS SQL Server

### 1. Backend Kurulumu (.NET Core API)
1. Terminali açın ve backend dizinine gidin: `cd Backend/RentACar.API`
2. `appsettings.json` dosyasını açarak `DefaultConnection` dizesini kendi SQL Server bilgilerinize göre güncelleyin. *(Not: JWT ve Recaptcha anahtarları güvenlik nedeniyle gizlenmiştir).*
3. Veritabanını oluşturun ve güncelleyin: `dotnet ef database update`
4. Projeyi başlatın: `dotnet run`
*(API varsayılan olarak http://localhost:5261 adresinde çalışacaktır.)*

### 2. Frontend Kurulumu (Next.js)
1. Yeni bir terminal açın ve frontend dizinine gidin: `cd Frontend/rent-a-car`
2. Gerekli paketleri ve bağımlılıkları yükleyin: `npm install`
3. Geliştirme sunucusunu başlatın: `npm run dev`
*(Arayüz varsayılan olarak http://localhost:3000 adresinde çalışacaktır.)*

---
*Bu proje, Full-Stack geliştirme prensipleri ve en iyi kodlama pratikleri (Best Practices) gözetilerek geliştirilmektedir.*