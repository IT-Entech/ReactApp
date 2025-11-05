using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Data;
using ReactApp.Server.Models;

namespace ReactApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public ProductController(ApplicationDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var productData = await _db.Set<Product>()
                .FromSqlInterpolated($@"
SELECT LTRIM(RTRIM(b.customer_segment_name)) As product,
CAST(a.customer_segment_code AS int) AS product_code,
SUM(total_before_vat) AS revenue,
CAST(staff_id AS nvarchar(13)) AS staff_id,
COUNT(so_no) AS deal,
RTRIM(LTRIM(sales_channels_group_code)) AS channel,
CAST(year_no AS int) AS year_no,
 CAST(month_no AS int) AS month_no
 FROM View_SO_SUM a 
LEFT JOIN ms_customer_segment b ON A.customer_segment_code = b.customer_segment_code
WHERE year_no >= 2023
GROUP BY year_no, month_no, sales_channels_group_code, staff_id, a.customer_segment_code, b.customer_segment_name
   ORDER BY year_no, month_no
    ")
                .AsNoTracking()
                .ToListAsync();

            return Ok(new {products = productData });

        }
    }
}
