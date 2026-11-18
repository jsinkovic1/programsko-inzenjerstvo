using CharterBackend.Data;
using CharterBackend.Options;
using CharterBackend.Services;
using CharterBackend.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using System.Data.Common;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container
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
            policy.WithOrigins("http://localhost:5173", "http://localhost:8080", "https://charterly.site")
                .AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        });
});

// Proslijeđena zaglavlja omogućuju ispravno prepoznavanje izvornog protokola i IP adrese iza proxyja
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor |
        ForwardedHeaders.XForwardedProto |
        ForwardedHeaders.XForwardedHost;
});

// Registriraju se pomoć za HTTP kontekst i aplikacijski servisi s dosegom jednog zahtjeva
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IAuthTokenProcessor, AuthTokenProcessor>();
builder.Services.AddScoped<IAccountService, AccountService>();

// Postavlja se JWT kao zadana shema za autentikaciju i izazivanje prijave
builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddCookie().AddGoogle(options =>
{
    // Google OAuth podaci učitavaju se iz secretsa
    var clientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID");

    if (clientId == null)
    {
        throw new ArgumentNullException(nameof(clientId));
    }

    var clientSecret = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET");

    if (clientSecret == null)
    {
        throw new ArgumentNullException(nameof(clientSecret));
    }

    options.ClientId = clientId;
    options.ClientSecret = clientSecret;
    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{
    // Učitavaju se postavke za provjeru JWT tokena
    var jwtOptions = builder.Configuration.GetSection(JwtOptions.JwtOptionsKey)
        .Get<JwtOptions>() ?? throw new ArgumentException(nameof(JwtOptions));

    // Za prihvaćanje tokena provjeravaju se izdavatelj, publika, rok trajanja i potpis
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtOptions.Issuer,
        ValidAudience = jwtOptions.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Secret))
    };

    options.Events = new JwtBearerEvents
    {
        // Token se čita iz ACCESS_TOKEN kolačića
        OnMessageReceived = context =>
        {
            context.Token = context.Request.Cookies["ACCESS_TOKEN"];
            return Task.CompletedTask;
        }
    };
});

var app = builder.Build();

app.UseForwardedHeaders();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("Default");


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();