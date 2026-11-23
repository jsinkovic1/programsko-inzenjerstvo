using CharterBackend.Data;
using CharterBackend.Models;
using CharterBackend.Services.Interfaces;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace CharterBackend.Services
{
    // Obrađuje korisnički račun nakon uspješne vanjske autentikacije
    public class AccountService : IAccountService
    {
        private readonly AppDbContext ctx;
        private readonly IAuthTokenProcessor _authTokenProcessor;
        private readonly ILogger<AccountService> _logger;

        public AccountService(AppDbContext ctx, IAuthTokenProcessor authTokenProcessor, ILogger<AccountService> logger)
        {
            this.ctx = ctx;
            _authTokenProcessor = authTokenProcessor;
            _logger = logger;
        }

        public async Task LoginWithGoogleAsync(ClaimsPrincipal? principal)
        {
            // Bez identiteta korisnika nije moguće nastaviti prijavu
            if (principal == null)
                throw new Exception("ClaimsPrincipal is null");

            // Iz Google identiteta preuzimaju se jedinstveni identifikator i mail
            var sub = principal.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new Exception("Subject is null");
            var email = principal.FindFirstValue(ClaimTypes.Email)
                ?? throw new Exception("Email is null");

            // Provjerava se postoji li korisnik u lokalnoj bazi prema Google identifikatoru
            var korisnik = await ctx.Korisnici.FirstOrDefaultAsync(k => k.GoogleSubject == sub);

            if (korisnik == null)
            {
                korisnik = new Korisnik
                {
                    GoogleSubject = sub,
                    Mail = email,
                    Ime = principal.FindFirstValue(ClaimTypes.GivenName) ?? "",
                    Prezime = principal.FindFirstValue(ClaimTypes.Surname) ?? "",
                    Aktivan = true,
                    Uloga = "KORISNIK"
                };
                ctx.Korisnici.Add(korisnik);
                await ctx.SaveChangesAsync();

                _logger.LogInformation("Novi korisnik stvoren: {Mail}", email);
            }

            // Neaktivnim korisnicima nije dopušten nastavak prijave
            if (!korisnik.Aktivan)
            {
                _logger.LogWarning("Pokušaj prijave neaktivnog korisnika: {Mail}", email);
                throw new Exception("User is inactive");
            }

            // Za aktivnog korisnika izrađuje se JWT i zapisuje u HTTP-only kolačić
            var (jwt, exp) = _authTokenProcessor.GenerateJwtToken(korisnik);
            _authTokenProcessor.WriteAuthTokenAsHttpOnlyCookie("ACCESS_TOKEN", jwt, exp);
        }
    }
}
