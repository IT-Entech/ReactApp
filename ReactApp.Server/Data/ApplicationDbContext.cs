using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Models;

namespace ReactApp.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Staff> a_user { get; set; } = null!;
        public DbSet<Sale> View_SO_SUM { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // กำหนดว่า Sale เป็น keyless entity เพราะเป็น View
            modelBuilder.Entity<Sale>()
                .HasNoKey()
                .ToView("View_SO_SUM"); // ชื่อ View ในฐานข้อมูล
        }
        public DbSet<Customer> appoint_head { get; set; } = null!;
        public DbSet<Quotation> cost_sheet_head { get; set; } = null!;
    }
}
