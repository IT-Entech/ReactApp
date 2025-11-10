using System.ComponentModel.DataAnnotations;

namespace ReactApp.Server.Models
{
    public class Waste
    {
        [Key]
        public int id { get; set; }
        public string? waste_name { get; set; }
    }
}
