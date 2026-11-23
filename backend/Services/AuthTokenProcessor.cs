using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CharterBackend.Models;
using CharterBackend.Options;
using CharterBackend.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace CharterBackend.Services
{
    // Servis odgovoran za izradu JWT tokena i njihovo sigurno spremanje u kolačić
    public class AuthTokenProcessor : IAuthTokenProcessor
    {
        private readonly JwtOptions _jwt;

        // Omogućuje pristup trenutnom HTTP kontekstu, uključujući zahtjev i odgovor
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthTokenProcessor(JwtOptions jwt, IHttpContextAccessor httpContextAccessor)
        {
            // Učitavaju se JWT postavke iz konfiguracijskog odjeljka aplikacije
            _jwt = jwt;
            _httpContextAccessor = httpContextAccessor;
        }

        public (string jwtToken, DateTime expiresAtUtc) GenerateJwtToken(Korisnik korisnik)
        {
            // Tajna konfiguracijska vrijednost koristi se kao ključ za potpisivanje tokena
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // U token se spremaju identitet, adresa e-pošte i uloga korisnika
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, korisnik.GoogleSubject.ToString()),
                new Claim(ClaimTypes.NameIdentifier, korisnik.Idkorisnika.ToString()),
                new Claim(ClaimTypes.Email, korisnik.Mail),
                new Claim(ClaimTypes.Role, korisnik.Uloga)
            };

            var expires = DateTime.UtcNow.AddHours(1);

            // Izrađuje se JWT s izdavateljem, publikom, podacima korisnika i potpisom
            var token = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: expires,
                signingCredentials: credentials);

            // Token se pretvara u tekstualni oblik i vraća zajedno s vremenom isteka
            return (new JwtSecurityTokenHandler().WriteToken(token), expires);
        }

        // JWT token se zapisuje u kolačić
        public void WriteAuthTokenAsHttpOnlyCookie(string cookieName, string token, DateTime expiration)
        {
            var context = _httpContextAccessor.HttpContext!;

            context.Response.Cookies.Append(cookieName, token, new CookieOptions
            {
                HttpOnly = true,
                Secure = context.Request.IsHttps,
                SameSite = SameSiteMode.Lax,
                Expires = new DateTimeOffset(expiration, TimeSpan.Zero)
            });
        }
    }
}
