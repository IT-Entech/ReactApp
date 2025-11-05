using Microsoft.EntityFrameworkCore;

namespace ReactApp.Server.Models
{
    public class Sale
    {
        public int product_code { get; set; }

        public string? product { get; set; }
        public int deal { get; set; }
        public string? staff_id { get; set; }
        public int? month_no { get; set; } 
        public int? year_no { get; set; }

        [Precision(18, 2)]
        public decimal? revenue { get; set; }
        [Precision(18, 2)]
        public decimal? revenueNew { get; set; }
        [Precision(18, 2)]
        public decimal? revenueRenew { get; set; }
        [Precision(18, 2)]
        public decimal? revenueAccount { get; set; }
        [Precision(18, 2)]
        public decimal? revenueKeyAccount { get; set; }


        public string? channel { get; set; }
    }
}
