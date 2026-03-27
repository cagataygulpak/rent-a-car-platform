using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using RentACar.API.data;

namespace RentACar.API.Controller;



[ApiController]
[Route("api/[Controller]")]
public class AccountController : ControllerBase
{
    private readonly Datacontext _dataContext;

    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IConfiguration _configuration;

    public AccountController(Datacontext dataContext, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration)
    {
        _dataContext = dataContext;
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    // --- KAYIT OL (REGISTER + reCAPTCHA) ---
    [HttpPost("register")]
    public async Task<IActionResult> Register(string username, string email, string password, string captchaToken)
    {
        if (!ModelState.IsValid) return BadRequest("Geçersiz veri.");

        // 1. ÖNCE ROBOT KONTROLÜ YAPALIM
        // Eğer captchaToken boşsa veya Google "Bu robot" derse işlemi iptal et.
        var isHuman = await VerifyRecaptcha(captchaToken);

        if (!isHuman)
        {
            return BadRequest(new { code = "RobotDetected", description = "Robot doğrulaması başarısız! Lütfen tekrar deneyin." });
        }

        // 2. KULLANICIYI OLUŞTUR (Robot değilse buraya geçer)
        var user = new IdentityUser
        {
            UserName = username,
            Email = email
        };

        var result = await _userManager.CreateAsync(user, password);

        if (result.Succeeded)
        {
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


    // --- GİRİŞ YAP (LOGIN) ---
    // LoginDto yerine direkt email ve şifre alıyoruz
    [HttpPost("login")]
    public async Task<IActionResult> Login(string email, string password)
    {
        if (ModelState.IsValid == false)
        {
            return BadRequest("Geçersiz veri.");
        }

        // 1. Kullanıcıyı email ile bul
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
        {
            return Unauthorized("Kullanıcı bulunamadı.");
        }

        // 2. Şifreyi kontrol et (PasswordSignInAsync veya CheckPasswordAsync)
        var checkPassword = await _signInManager.CheckPasswordSignInAsync(user, password, false);

        if (checkPassword.Succeeded)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtKey = _configuration["JwtSettings:Key"];
            var key = Encoding.ASCII.GetBytes(jwtKey!);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id), new Claim("username", user.UserName!) }),
                Expires = DateTime.UtcNow.AddDays(7), // 7 Gün geçerli
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // 2. Token'ı HttpOnly Cookie Olarak Ver (Frontend okuyamaz, Hacker çalamaz)
            Response.Cookies.Append("jwt", tokenString, new CookieOptions
            {
                HttpOnly = true, // JavaScript erişemez!
                Secure = false,  // Localhost (http) için false. Canlıda (https) true yapmalısın.
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            var roles = await _userManager.GetRolesAsync(user);  // rol alma
            var userRole = roles.FirstOrDefault() ?? "User";

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


    // --- ÇIKIŞ YAP (Cookie Sil) ---
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("jwt");
        return Ok(new { message = "Çıkış yapıldı" });
    }
}