using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Data;
using ReactApp.Server.Models;

namespace ReactApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StaffsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public StaffsController(ApplicationDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var Staffdata = await _db.Set<Staff>()
                .FromSqlInterpolated($@"
                 SELECT b.staff_id, b.fname_e AS SaleName FROM a_user a 
                LEFT JOIN hr_staff b ON a.staff_id = b.staff_id
                WHERE active = 'Y'
                AND b.position_code IN ('067')

                ")
                .ToListAsync();

            return Ok(new {Staffdata});
        }
    }
}
