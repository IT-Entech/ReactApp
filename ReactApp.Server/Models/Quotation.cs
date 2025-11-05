using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ReactApp.Server.Models
{
    public class Quotation
    {
        [Key]
        public string? qt_no { get; set; }
        [Required]
        public string? name { get; set; }
        public string? customer_name { get; set; }
        public string? stage { get; set; }
        public string? track { get; set; }
        public string? remark { get; set; }
        public string? staff_id { get; set; }
        public string? salesperson { get; set; }
        public int? month_no { get; set; }
        public int? year_no { get; set; }
        [Precision(18, 2)]
        public decimal? value { get; set; }
     
    }
}
