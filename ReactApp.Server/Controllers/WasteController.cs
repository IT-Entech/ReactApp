using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Data;
using ReactApp.Server.Models;

namespace ReactApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WasteController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public WasteController(ApplicationDbContext db) => _db = db;
        [HttpGet]
        public async Task<IActionResult> GetWastes()
        {
            var waste = await _db.Set<Waste>()
                 .FromSqlInterpolated($@"
WITH CTE As(
SELECT DISTINCT(waste_name) AS waste_name  FROM ms_waste_price_list 
)
SELECT CAST( ROW_NUMBER() OVER (ORDER BY waste_name ASC) AS int) AS id,* FROM CTE
    ")
                .AsNoTracking()
                .ToListAsync();

            return Ok(new { wastes = waste });


        }
    }
}
