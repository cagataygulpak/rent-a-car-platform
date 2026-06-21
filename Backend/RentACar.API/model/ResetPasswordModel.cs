// Models/ResetPasswordModel.cs
using System.ComponentModel.DataAnnotations;

namespace RentACar.API.Model;

public class ResetPasswordModel
{
    [Required(ErrorMessage = "E-posta adresi zorunludur.")]
    [EmailAddress(ErrorMessage = "Geçersiz e-posta formatı.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Güvenlik kodu (Token) zorunludur.")]
    public string Token { get; set; } = string.Empty;

    [Required(ErrorMessage = "Yeni şifre zorunludur.")]
    public string NewPassword { get; set; } = string.Empty;
}