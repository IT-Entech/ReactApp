using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
      sqlOptions =>
      {
          sqlOptions.CommandTimeout(120);
          sqlOptions.EnableRetryOnFailure(
              maxRetryCount: 5,                    // retry ได้สูงสุด 5 ครั้ง
              maxRetryDelay: TimeSpan.FromSeconds(10), // เวลาหน่วงระหว่าง retry
              errorNumbersToAdd: null
          // ปล่อยว่างให้ใช้ default error numbers
          );
          }
    ));


var app = builder.Build();

app.UseCors("AllowAll");
app.MapControllers();
app.UseStaticFiles();
app.MapFallbackToFile("/index.html");


app.Run();
