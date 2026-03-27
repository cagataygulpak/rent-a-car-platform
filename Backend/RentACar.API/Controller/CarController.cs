namespace RentACar.API.Controller;

using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentACar.API.data;

[ApiController]
[Route("api/[Controller]")]
public class CarsController(Datacontext dataContext) : ControllerBase
{

    private readonly Datacontext _dataContext = dataContext;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var cars = await _dataContext.Cars.ToListAsync();
        return Ok(cars);
    }
}
