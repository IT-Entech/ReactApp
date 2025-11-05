using System.ComponentModel.DataAnnotations;

namespace ReactApp.Server.Models
{
    public class Staff
    {
        [Key]
        [StringLength(13)]
        public string staff_id { get; set; } = string.Empty;
        [Required]
        public string SaleName { get; set; } = string.Empty;
    }
}
