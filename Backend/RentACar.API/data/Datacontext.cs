namespace RentACar.API.data
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;

    public class Datacontext : IdentityDbContext
    {
        public Datacontext(DbContextOptions<Datacontext> options) : base(options)
        {
        }

        public DbSet<Car> Cars { get; set; }
    }
}