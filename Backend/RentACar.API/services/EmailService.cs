// Services/EmailService.cs
using System.Net;
using System.Net.Mail;

namespace RentACar.API.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        // Ayarları birazdan appsettings.json içerisine yazacağız
        var smtpServer = _configuration["EmailSettings:SmtpServer"];
        var port = int.Parse(_configuration["EmailSettings:Port"] ?? "587");
        var fromEmail = _configuration["EmailSettings:FromEmail"];
        var password = _configuration["EmailSettings:Password"]; // Google Uygulama Şifresi

        using (var client = new SmtpClient(smtpServer, port))
        {
            client.Credentials = new NetworkCredential(fromEmail, password);
            client.EnableSsl = true;

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail!, "Rent A Car Güvenlik"),
                Subject = subject,
                Body = body,
                IsBodyHtml = true // Link gönderdiğimiz için HTML formatında açıyoruz
            };

            mailMessage.To.Add(toEmail);

            await client.SendMailAsync(mailMessage);
        }
    }
}