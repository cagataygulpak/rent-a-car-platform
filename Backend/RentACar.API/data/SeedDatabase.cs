using Microsoft.AspNetCore.Identity;

namespace RentACar.API.data;

public class SeedDatabase
{
    public static async Task SeedUsers(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        // 1. ADIM: ROLLERİ GARANTİ ALTINA AL
        string[] roles = { "Admin", "Member" };
        foreach (var roleName in roles)
        {
            // Eğer rol veritabanında yoksa, anında oluştur.
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        // 2. ADIM: ADMİN HESABINI VE ROLÜNÜ GARANTİ ALTINA AL
        var adminEmail = "admin@rentacar.com";
        var adminUser = await userManager.FindByEmailAsync(adminEmail);

        // Kullanıcı hiç yoksa oluştur
        if (adminUser == null)
        {
            adminUser = new IdentityUser
            {
                UserName = "admin",
                Email = adminEmail,
                EmailConfirmed = true
            };
            await userManager.CreateAsync(adminUser, "Password123!");
        }

        // Kullanıcı var ama "Admin" rolü kopmuşsa (veya yeni oluştuysa), o rolü ekle
        if (!await userManager.IsInRoleAsync(adminUser, "Admin"))
        {
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }


        // 3. ADIM: NORMAL (MEMBER) HESABI VE ROLÜNÜ GARANTİ ALTINA AL
        var memberEmail = "ahmet@rentacar.com";
        var memberUser = await userManager.FindByEmailAsync(memberEmail);

        // Kullanıcı hiç yoksa oluştur
        if (memberUser == null)
        {
            memberUser = new IdentityUser
            {
                UserName = "ahmet",
                Email = memberEmail,
                EmailConfirmed = true
            };
            await userManager.CreateAsync(memberUser, "Password123!");
        }

        // Kullanıcı var ama "Member" rolü kopmuşsa (veya yeni oluştuysa), o rolü ekle
        if (!await userManager.IsInRoleAsync(memberUser, "Member"))
        {
            await userManager.AddToRoleAsync(memberUser, "Member");
        }
    }
}