using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Data;
using ReactApp.Server.Models;

namespace ReactApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DBSalesController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public DBSalesController(ApplicationDbContext db) => _db = db;

        [HttpPost]
        public async Task<IActionResult> GetAll([FromBody] SalesFilterRequest? filter)
        {
            var year = filter?.Year ?? 2023;
            var staffId = filter?.StaffId;
            var channel = filter?.Channel;

            var data = await _db.Set<Sale>()
                .FromSqlInterpolated($@"
SELECT b.customer_segment_name As product,
CAST(a.customer_segment_code AS int) AS product_code,
SUM(total_before_vat) AS revenue,
  CASE WHEN customer_type = 'N'THEN SUM(total_before_vat) END AS revenueNew,
       CASE WHEN customer_type = 'R'THEN SUM(total_before_vat) END AS revenueRenew,
       CASE WHEN customer_type = 'A'THEN SUM(total_before_vat) END AS revenueAccount,
       CASE WHEN customer_type = 'K'THEN SUM(total_before_vat) END AS revenueKeyAccount,
CAST(staff_id AS nvarchar(13)) AS staff_id,
COUNT(so_no) AS deal,
RTRIM(LTRIM(sales_channels_group_code)) AS channel,
CAST(year_no AS int) AS year_no,
 CAST(month_no AS int) AS month_no
 FROM View_SO_SUM a 
LEFT JOIN ms_customer_segment b ON A.customer_segment_code = b.customer_segment_code
WHERE year_no >= 2023
GROUP BY year_no, month_no, sales_channels_group_code, staff_id, a.customer_segment_code, b.customer_segment_name, customer_type
   ORDER BY year_no, month_no
    ")
                .AsNoTracking()
                .ToListAsync();
            
                
            return Ok(new { sales = data });

        }
    }
    // ✅ คลาสสำหรับรับค่าจาก body JSON
    public class SalesFilterRequest
    {
        public int? Year { get; set; }
        public int? Month { get; set; }
        public string? StaffId { get; set; }
        public string? Channel { get; set; }
    }
}
