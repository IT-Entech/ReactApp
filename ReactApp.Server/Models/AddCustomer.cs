using System.ComponentModel.DataAnnotations;

namespace ReactApp.Server.Models
{
    public class AddCustomer
    {
        [Key]
        public int Id { get; set; }
        public string? Channel { get; set; }
        public string? Group { get; set; }
        public string? Tools { get; set; }
        public string? Search { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? FactoryNo { get; set; }
        public string? Company { get; set; }
        public string? Status { get; set; }
        public decimal? Value { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
