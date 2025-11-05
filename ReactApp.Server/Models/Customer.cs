using System.ComponentModel.DataAnnotations;

namespace ReactApp.Server.Models
{
    public class Customer
    {
        [Key]
        public string? appoint_no { get; set; }
        [Required]
        public string? name { get; set; }
        public string? customer_name { get; set; }
        public string? email { get; set; }
        public string? tel { get; set; }
        public string? status { get; set; }
        public string? staff_id { get; set; }
        public int? month_no { get; set; }
        public int? year_no { get; set; }
    }
}
