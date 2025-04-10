using Microsoft.EntityFrameworkCore;
using OrderApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer(); // Required for minimal APIs
builder.Services.AddSwaggerGen(); // Add Swagger services
builder.Services.AddControllers(); // Add support for controllers
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("OrderDb"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev",
        builder => builder.WithOrigins("http://localhost:4200")
                         .AllowAnyHeader()
                         .AllowAnyMethod());
});

var app = builder.Build();
app.UseCors("AllowAngularDev");
SeedDatabase(app);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Enable Swagger middleware
    app.UseSwaggerUI(); // Enable Swagger UI
}

app.UseHttpsRedirection();

app.UseRouting(); // Add routing middleware

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Map controller endpoints
});

app.Run();

static void SeedDatabase(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    // Add initial items to the database
    if (!context.Items.Any())
    {
        var items = new List<Item>
        {
        new Item { Id = 1, Name = "Household Cleaner", Price = 25.00m },
        new Item { Id = 2, Name = "Dosa Batter", Price = 15.50m },
        new Item { Id = 3, Name = "Milk Carton", Price = 10.00m },
        new Item { Id = 4, Name = "Rice Pack", Price = 40.00m },
        new Item { Id = 5, Name = "Washing Powder", Price = 12.75m },
        new Item { Id = 6, Name = "Cereal Box", Price = 8.99m },
        new Item { Id = 7, Name = "Vegetable Oil", Price = 18.50m },
        new Item { Id = 8, Name = "Toothpaste", Price = 3.99m },
        new Item { Id = 9, Name = "Fruit Basket", Price = 22.30m }
        };

        context.Items.AddRange(items);
        context.SaveChanges();
    }
}