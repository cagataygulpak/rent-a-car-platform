using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentACar.API.data; // Kendi namespace'ine göre kontrol et

namespace RentACar.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly Datacontext _context;

        // Veritabanı bağlantımızı içeri alıyoruz (Dependency Injection)
        public CarsController(Datacontext context)
        {
            _context = context;
        }

        // 1. GET: api/cars (HERKESE AÇIK - Tüm araçları listeler)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {
            return await _context.Cars.ToListAsync();
        }

        // 2. GET: api/cars/5 (HERKESE AÇIK - Sadece 1 aracın detayını getirir)
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);

            if (car == null)
            {
                return NotFound(new { Mesaj = "Araç bulunamadı!" });
            }

            return car;
        }

        // 3. POST: api/cars (SADECE ADMİNLER - Yeni araç ekler)
        [HttpPost]
        [Authorize(Roles = "Admin")] // 👈 Güvenlik Kilidi!
        public async Task<ActionResult<Car>> CreateCar(Car car)
        {
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            // Kayıt başarılıysa, oluşan yeni arabayı 201 (Created) koduyla geri dön
            return CreatedAtAction(nameof(GetCar), new { id = car.Id }, car);
        }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0) return BadRequest("Dosya seçilmedi.");

            // 1. Resmin kaydedileceği klasör yolu: wwwroot/images/cars
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "cars");

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            // 2. Dosya adını benzersiz yap (Aynı isimli resimler birbirini ezmesin)
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(folderPath, fileName);

            // 3. Dosyayı klasöre kaydet
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // 4. MSSQL'e kaydedilecek olan string yolu dön
            var dbPath = $"/images/cars/{fileName}";
            return Ok(new { url = dbPath });
        }

        // 4. PUT: api/cars/5 (SADECE ADMİNLER - Aracı günceller)
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")] // 👈 Güvenlik Kilidi!
        public async Task<IActionResult> UpdateCar(int id, Car car)
        {
            if (id != car.Id)
            {
                return BadRequest(new { Mesaj = "ID uyuşmazlığı!" });
            }

            _context.Entry(car).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(id))
                {
                    return NotFound(new { Mesaj = "Güncellenecek araç bulunamadı!" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { Mesaj = "Araç başarıyla güncellendi!" });
        }

        // 5. DELETE: api/cars/5 (SADECE ADMİNLER - Aracı siler)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")] // 👈 Güvenlik Kilidi!
        public async Task<IActionResult> DeleteCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound(new { Mesaj = "Silinecek araç bulunamadı!" });
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return Ok(new { Mesaj = "Araç sistemden başarıyla silindi." });
        }

        // Yardımcı Metot: Araç veritabanında var mı yok mu kontrolü
        private bool CarExists(int id)
        {
            return _context.Cars.Any(e => e.Id == id);
        }
    }
}