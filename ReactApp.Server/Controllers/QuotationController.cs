using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Data;
using ReactApp.Server.Models;

namespace ReactApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuotationController : Controller
    {
        private readonly ApplicationDbContext _db;
        public QuotationController(ApplicationDbContext db) => _db = db;
        [HttpPost]
        public async Task<IActionResult> GetAll([FromBody] QuotationsFilterRequest? filter)
        {
            try
            {
                var year = filter?.Year ?? 2023;
                var staffId = filter?.StaffId;
                var data = await _db.Set<Quotation>()
                    .FromSqlInterpolated($@"
SELECT 
a.record_date,
a.update_date,
qt_no,
 CASE WHEN a.contact_name IS NULL THEN '-'
 ELSE  LTRIM(RTRIM(A.contact_name)) END AS name,
customer_name,
so_amount AS value,
a.staff_id,
b.fname_e as salesperson,
is_prospect,
CASE WHEN is_prospect = '05' THEN 'potential'
WHEN is_prospect = '04' THEN 'prospect'
WHEN is_prospect = '06' THEN 'pipeline'
else 'N/A'
END AS stage,
  is_tracking,
  CASE WHEN is_tracking = '1' THEN 'ได้งาน'
  WHEN is_tracking = '2' THEN 'ไม่ได้งาน'
  WHEN is_tracking = '3' THEN  'อยู่ระหว่างติดตาม'
  end AS track,
  remark,
  reasoning,
YEAR(qt_date)AS year_no,
MONTH(qt_date) AS month_no
FROM cost_sheet_head a 
LEFT JOIN hr_staff b ON a.staff_id = b.staff_id
WHERE is_status = 'A'
AND expiration_qt_date >= GETDATE()
AND is_pre = 'N'
AND is_status = 'A'
AND b.position_code = '067'
    ")
                    .AsNoTracking()
                    .ToListAsync();


                return Ok(new { quotations = data });
            }
            catch (Exception ex)
            {

                return StatusCode(500, new { error = ex.Message });
            }
        }
        }
    public class QuotationsFilterRequest
    {
        public int? Year { get; set; }
        public int? Month { get; set; }
        public string? StaffId { get; set; }
    }
}
