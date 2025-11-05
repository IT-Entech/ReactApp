using System.ComponentModel.DataAnnotations;

namespace ReactApp.Server.Models
{
    public class Appoint
    {
        [Key]
        public char appoint_no { get; set; }
        [Required]
        public char staff_id { get; set; }
        public char channel { get; set; }
        public Int16? year_no { get; set; }
        public Int16? month_no { get; set; }
    }
}
