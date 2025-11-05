namespace ReactApp.Server.Models
{
    public class Product
    {
        public int product_code { get; set; }
        public string? product { get; set; }
        public decimal? revenue { get; set; }
        public string? staff_id { get; set; }
        public int deal { get; set; }
        public string? channel { get; set; }
        public int? year_no { get; set; }
        public int? month_no { get; set; }
    }
}
