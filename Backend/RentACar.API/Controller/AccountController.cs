using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using RentACar.API.data;
using RentACar.API.Services;
using RentACar.API.Model;

namespace RentACar.API.Controller;



[ApiController]
[Route("api/[Controller]")]
public class AccountController : ControllerBase
{
    private readonly Datacontext _dataContext;

    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IConfiguration _configuration;

    private readonly IEmailService _emailService;

    public AccountController(
        Datacontext dataContext, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration, IEmailService emailService
        )
    {
        _dataContext = dataContext;
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _emailService = emailService;
    }

    // --- KAYIT OL (REGISTER + reCAPTCHA) ---
    // --- KAYIT OL (REGISTER + reCAPTCHA) ---
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model) // 🛠️ URL yerine JSON (Body) kullanıyoruz
    {
        if (!ModelState.IsValid) return BadRequest("Geçersiz veri.");

        // 1. ÖNCE ROBOT KONTROLÜ YAPALIM
        var isHuman = await VerifyRecaptcha(model.CaptchaToken);

        if (!isHuman)
        {
            return BadRequest(new { code = "RobotDetected", description = "Robot doğrulaması başarısız! Lütfen tekrar deneyin." });
        }

        // 2. KULLANICIYI OLUŞTUR
        var user = new IdentityUser
        {
            UserName = model.Username,
            Email = model.Email
        };

        // Şifre havada bozulmadan, olduğu gibi veritabanına mühürleniyor
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "Member");
            return Ok("Kullanıcı başarıyla oluşturuldu.");
        }

        return BadRequest(result.Errors);
    }

    // --- YARDIMCI METOT: GOOGLE'A SORMA İŞLEMİ ---
    private async Task<bool> VerifyRecaptcha(string token)
    {
        // Secret Key'i appsettings.json dosyasından alacağız
        var secretKey = _configuration["Recaptcha:SecretKey"];
        if (string.IsNullOrEmpty(secretKey)) return false; // Key yoksa hata

        using (var client = new HttpClient())
        {
            // Google'ın doğrulama adresine istek atıyoruz
            var response = await client.GetAsync($"https://www.google.com/recaptcha/api/siteverify?secret={secretKey}&response={token}");

            if (response.IsSuccessStatusCode)
            {
                var jsonString = await response.Content.ReadAsStringAsync();
                var json = JObject.Parse(jsonString);
                // Google'dan gelen cevapta "success": true yazıyor mu?
                return (bool)json["success"];
            }
        }
        return false;
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model) // 🛠️ URL parametreleri yerine JSON Body (Model) kullanıyoruz
    {
        if (ModelState.IsValid == false)
        {
            return BadRequest("Geçersiz veri.");
        }

        // 1. Kullanıcıyı modelden gelen email ile bul
        var user = await _userManager.FindByEmailAsync(model.Email);

        if (user == null)
        {
            return Unauthorized("Kullanıcı bulunamadı.");
        }

        // 2. Şifreyi modelden gelen password ile ham olarak kontrol et (Havada bozulma ihtimali bitti!)
        var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, model.Password);

        if (isPasswordCorrect)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var userRole = roles.FirstOrDefault() ?? "User";

            var authClaims = new List<Claim>
            {
                new Claim("id", user.Id),
                new Claim("username", user.UserName!)
            };

            foreach (var role in roles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtKey = _configuration["JwtSettings:Key"];
            var key = Encoding.ASCII.GetBytes(jwtKey!);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(authClaims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            Response.Cookies.Append("jwt", tokenString, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return Ok(new
            {
                message = "Giriş Başarılı",
                userId = user.Id,
                username = user.UserName,
                role = userRole
            });
        }

        return Unauthorized("Şifre hatalı.");
    }


    // --- ŞİFREMİ UNUTTUM (FORGOT PASSWORD) ---
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(string email)
    {
        if (string.IsNullOrEmpty(email)) return BadRequest("E-posta adresi boş olamaz.");

        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return BadRequest("Bu e-posta adresine kayıtlı bir kullanıcı bulunamadı.");
        }

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var bytes = System.Text.Encoding.UTF8.GetBytes(token);
        var base64Token = Convert.ToBase64String(bytes);

        var callbackUrl = $"http://localhost:3000/reset-password?token={System.Net.WebUtility.UrlEncode(base64Token)}&email={System.Net.WebUtility.UrlEncode(user.Email!)}";

        // 📧 GERÇEK MAİL MOTORUNU ÇALIŞTIRIYORUZ
        string mailSubject = "Rent A Car - Şifre Sıfırlama Talebi";
        string mailBody = $@"
        <div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 500px;'>
            <h2 style='color: #4f46e5;'>Şifre Sıfırlama Talebi</h2>
            <p>Merhaba {user.UserName},</p>
            <p>Hesabınızın şifresini sıfırlamak için bir talepte bulundunuz. Aşağıdaki butona tıklayarak yeni şifrenizi belirleyebilirsiniz:</p>
            <div style='margin: 30px 0; text-align: center;'>
                <a href='{callbackUrl}' style='background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; rounded-md: 8px; border-radius: 8px;'>Şifremi Yenile</a>
            </div>
            <p style='color: #666; font-size: 12px;'>Eğer bu talebi siz yapmadıysanız, bu e-postayı dikkate almayınız. Bu link güvenliğiniz için tek kullanımlıktır.</p>
        </div>";

        try
        {
            await _emailService.SendEmailAsync(user.Email!, mailSubject, mailBody);
            return Ok(new { message = "Şifre sıfırlama linki e-posta adresinize aslanlar gibi gönderildi! Mail kutunuzu kontrol edin. 📬" });
        }
        catch (Exception ex)
        {
            return BadRequest($"Mail gönderilirken teknik bir hata oluştu: {ex.Message}");
        }
    }


    // --- ŞİFREYİ SIFIRLA (RESET PASSWORD) ---
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
    {
        // 🛠️ LOGLARI EN TEPEDE YAKALIYORUZ (Boş mu dolu mu anında terminale basılacak!)
        Console.WriteLine("=====================================");
        Console.WriteLine($"API'YE GELEN EMAIL: '{model.Email}'");
        Console.WriteLine($"API'YE GELEN SIFRE: '{model.NewPassword}'");
        Console.WriteLine($"API'YE GELEN TOKEN UZUNLUGU: {model.Token?.Length ?? 0}");
        Console.WriteLine("=====================================");

        if (!ModelState.IsValid) return BadRequest("Geçersiz veri.");

        // Base64 formatındaki token'ı orijinal haline geri çeviriyoruz
        string originalToken;
        try
        {
            var base64Bytes = Convert.FromBase64String(model.Token);
            originalToken = System.Text.Encoding.UTF8.GetString(base64Bytes);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Base64 Çevrim Hatası: {ex.Message}");
            return BadRequest("Şifre sıfırlama kodu (token) havada bozulmuş.");
        }

        // 1. Kullanıcıyı bulalım
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null) return BadRequest("Geçersiz istek.");

        var isSamePassword = await _userManager.CheckPasswordAsync(user, model.NewPassword);
        if (isSamePassword)
        {
            // Frontend'in (Array.isArray) yakalayabilmesi için IdentityError formatında dizi dönüyoruz
            return BadRequest(new[] { new { description = "Yeni şifreniz eski şifrenizle tamamen aynı olamaz! Lütfen farklı bir şifre belirleyin. 🚫" } });
        }

        // 2. Orijinal token ve JSON gövdesinden gelen bozulmamış net şifre ile sıfırlıyoruz
        var result = await _userManager.ResetPasswordAsync(user, originalToken, model.NewPassword);

        if (result.Succeeded)
        {
            // Güvenlik mührünü tazeleyip veritabanını kilitliyoruz
            await _userManager.UpdateSecurityStampAsync(user);
            Console.WriteLine("✔️ ŞİFRE BAŞARIYLA SIFIRLANDI VE VERİTABANINA YAZILDI!");
            return Ok(new { message = "Şifreniz başarıyla güncellendi! 🔐" });
        }

        // Eğer bir kural hatası varsa backend terminalinde görelim:
        Console.WriteLine("❌ IDENTITY SIFIRLAMA HATALARI:");
        foreach (var error in result.Errors)
        {
            Console.WriteLine($"-> Hata Kodu: {error.Code} - Açıklama: {error.Description}");
        }

        return BadRequest(result.Errors);
    }


    // --- ÇIKIŞ YAP (Cookie Sil) ---
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("jwt");
        return Ok(new { message = "Çıkış yapıldı" });
    }
}