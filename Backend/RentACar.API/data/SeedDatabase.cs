using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace RentACar.API.data;

public class SeedDatabase
{
    public static async Task SeedUsers(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        // 1. Önce Rolleri Kontrol Et, Yoksa Oluştur
        if (!await roleManager.Roles.AnyAsync())
        {
            await roleManager.CreateAsync(new IdentityRole { Name = "Admin" });
            await roleManager.CreateAsync(new IdentityRole { Name = "Member" });
        }

        // 2. Kullanıcı Var mı Diye Bak (Hiç yoksa ekle)
        if (!await userManager.Users.AnyAsync())
        {
            // --- ADMİN KULLANCISI ---
            var adminUser = new IdentityUser
            {
                UserName = "admin",
                Email = "admin@rentacar.com",
                EmailConfirmed = true
            };

            // Şifreyi Identity otomatik hashleyecek
            await userManager.CreateAsync(adminUser, "Password123!");
            await userManager.AddToRoleAsync(adminUser, "Admin"); // Admin rolü ver

            // --- NORMAL KULLANICI ---
            var normalUser = new IdentityUser
            {
                UserName = "ahmet",
                Email = "ahmet@rentacar.com",
                EmailConfirmed = true
            };

            await userManager.CreateAsync(normalUser, "Password123!");
            await userManager.AddToRoleAsync(normalUser, "Member"); // Member rolü ver
        }
    }
}