using System.Data.Common;
using CharterBackend.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();

string dataSourceString =
    $"Host={Environment.GetEnvironmentVariable("HOST_ADDRESS")};" +
    $"Port={Environment.GetEnvironmentVariable("HOST_PORT")};" +
    $"Database={Environment.GetEnvironmentVariable("DATABASE_NAME")};" +
    $"Username={Environment.GetEnvironmentVariable("DATABASE_USER")};" +
    $"Password={Environment.GetEnvironmentVariable("DATABASE_PASSWORD")}";

var dataSource = new NpgsqlDataSourceBuilder(dataSourceString).Build();

builder.Services.AddDbContext<AppDbContext>(e =>
    e.UseNpgsql(dataSource));
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "Default",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:8080", "http://16.192.213.81:8080")
                .AllowAnyHeader().AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}


app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("Default");
app.UseAuthorization();

app.MapControllers();

app.Run();