using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentACar.API.data;

namespace RentACar.API.Controller;


[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/[Controller]")]
public class RoleController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public RoleController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    // 1. TÜM ROLLERİ GETİR
    [HttpGet("list")]
    public IActionResult GetRoles()
    {
        var roles = _roleManager.Roles.ToList();
        return Ok(roles);
    }

    // 2. TÜM KULLANICILARI GETİR (Rol atamak için lazım)
    [HttpGet("users")]
    public async Task<IActionResult> GetUsersAsync()
    {
        // Kullanıcı listesini çek
        var users = _userManager.Users.ToList();
        // Geriye döneceğimiz özel liste
        var userList = new List<object>();
        foreach (var user in users)
        {
            // Bu kullanıcının rollerini bul (Örn: ["Admin", "Editor"])
            var roles = await _userManager.GetRolesAsync(user);
            userList.Add(new
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Roles = roles // 👈 ARTIK ROLLERİ DE GÖNDERİYORUZ
            });
        }

        return Ok(userList);
    }

    // 3. ROL EKLE
    [HttpPost("create")]
    public async Task<IActionResult> CreateRole([FromQuery] string roleName)
    {
        if (string.IsNullOrEmpty(roleName)) return BadRequest("Rol adı boş olamaz");
        // 👇 YENİ KONTROL: Rol zaten var mı?
        if (await _roleManager.RoleExistsAsync(roleName))
        {
            return BadRequest("Bu rol zaten mevcut!"); // 400 Hata Kodu Döner
        }
        var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
        if (result.Succeeded) return Ok(new { message = "Rol başarıyla oluşturuldu" });
        return BadRequest(result.Errors);
    }

    // 4. ROL GÜNCELLE
    [HttpPut("update")]
    public async Task<IActionResult> UpdateRole(string id, string newName)
    {
        var role = await _roleManager.FindByIdAsync(id);
        if (role == null) return NotFound("Rol bulunamadı");

        role.Name = newName;
        var result = await _roleManager.UpdateAsync(role);

        if (result.Succeeded) return Ok(new { message = "Rol güncellendi" });
        return BadRequest(result.Errors);
    }

    // 5. ROL SİL
    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteRole(string id)
    {
        var role = await _roleManager.FindByIdAsync(id);
        if (role == null) return NotFound("Rol bulunamadı");

        var result = await _roleManager.DeleteAsync(role);
        if (result.Succeeded) return Ok(new { message = "Rol silindi" });
        return BadRequest(result.Errors);
    }

    // 6. KULLANICIYA ROL ATA
    [HttpPost("assign-role")]
    public async Task<IActionResult> AssignRoleToUser(string userId, string roleName)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return NotFound("Kullanıcı bulunamadı");

        var roleExists = await _roleManager.RoleExistsAsync(roleName);
        if (!roleExists) return NotFound("Böyle bir rol yok");

        // --- GÜVENLİK KONTROLÜ: SON ADMİN KORUMASI ---
        var currentRoles = await _userManager.GetRolesAsync(user);

        // Eğer kullanıcı şu an Admin ise VE Admin dışında bir role geçmeye çalışıyorsa
        if (currentRoles.Contains("Admin") && roleName != "Admin")
        {
            var adminUsers = await _userManager.GetUsersInRoleAsync("Admin");

            // Sistemde sadece 1 tane Admin kalmışsa, onun yetkisini alma!
            if (adminUsers.Count <= 1)
            {
                return BadRequest("Sistemde kalan son Admin'in yetkisi değiştirilemez!");
            }
        }

        // --- TEK ROL PRENSİBİ ---
        // 1. Kullanıcının mevcut tüm rollerini sil
        if (currentRoles.Any())
        {
            await _userManager.RemoveFromRolesAsync(user, currentRoles);
        }

        // 2. Yeni rolü ekle
        var result = await _userManager.AddToRoleAsync(user, roleName);

        if (result.Succeeded) return Ok(new { message = "Rol başarıyla güncellendi" });

        return BadRequest(result.Errors);
    }
}