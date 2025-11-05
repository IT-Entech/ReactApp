using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Data;
using ReactApp.Server.Models;

namespace ReactApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public CustomersController(ApplicationDbContext db) => _db = db;
        [HttpPost]
        public async Task<IActionResult> GetAll([FromBody] CustomersFilterRequest? filter)
        {
            try
            {
                var year = filter?.Year ?? 2023;
                var staffId = filter?.StaffId;
                var data = await _db.Set<Customer>()
                    .FromSqlInterpolated($@"
WITH adjusted_data AS (
    SELECT 
     B.is_status,
    FORMAT(A.appoint_date, 'yyyy-MM-dd') AS format_date,
    FORMAT(B.qt_date, 'yyyy-MM-dd') AS format_qtdate,
       CASE WHEN a.contact_name IS NULL THEN '-'
   ELSE  LTRIM(RTRIM(A.contact_name)) END AS name, 
    A.customer_name,
        CASE WHEN A.contact_mail IS NULL THEN 'ไม่ระบุอีเมล' 
    ELSE A.contact_mail END AS email,
   CASE WHEN A.contact_tel IS NULL THEN 'ไม่ระบุเบอร์โทรศัพท์'
   ELSE LTRIM(RTRIM(A.contact_tel)) END AS tel,
    A.appoint_no,
    B.qt_no,
        CASE 
            WHEN Sub.has_both_pre_n_and_y = 1 THEN 'N'
            ELSE B.is_pre
        END AS adjusted_is_pre,
       CASE WHEN B.record_date IS NOT NULL THEN DATEDIFF(DAY, B.record_date, GETDATE())
       ELSE 0 END AS pre_date,
       A.remark,
       A.month_no,
       A.year_no,
       A.staff_id
    FROM appoint_head A
    LEFT JOIN cost_sheet_head B ON A.appoint_no = B.appoint_no
    CROSS APPLY (
        SELECT 
            COUNT(DISTINCT is_pre) AS pre_type_count,
            CASE 
                WHEN COUNT(DISTINCT is_pre) = 2 THEN 1
                ELSE 0
            END AS has_both_pre_n_and_y
        FROM cost_sheet_head B2
        WHERE B2.appoint_no = A.appoint_no
        AND B2.is_status != 'C'
    ) AS Sub
    WHERE 
       year_no >= 2023
        AND A.staff_id != '1119700041155'
)
SELECT DISTINCT(appoint_no),
name,
customer_name,
CASE WHEN qt_no IS NULL THEN '-'
else qt_no END AS qt_no,format_date,
email,
tel,
CASE WHEN format_qtdate IS NULL THEN '-'
ELSE format_qtdate END AS qt_date,
CASE WHEN adjusted_is_pre = 'y' THEN 'prequotation'
else 'lead' END AS status,
CASE WHEN pre_date = 0 THEN '-'
else  pre_date END AS update_time,
CASE WHEN remark IS NULL THEN '-'
ELSE remark END AS remark,
   staff_id,
   CAST(year_no AS int) AS year_no,
 CAST(month_no AS int) AS month_no
FROM adjusted_data
WHERE adjusted_is_pre IS NULL OR adjusted_is_pre = 'Y'
AND is_status != 'C'
ORDER BY adjusted_data.appoint_no DESC
    ")
                    .AsNoTracking()
                    .ToListAsync();


                return Ok(new { customers = data });
            }
            catch (Exception ex)
            {

                return StatusCode(500, new { error = ex.Message });
            }
        }
        }
    public class CustomersFilterRequest
    {
        public int? Year { get; set; }
        public int? Month { get; set; }
        public string? StaffId { get; set; }
    }
}
