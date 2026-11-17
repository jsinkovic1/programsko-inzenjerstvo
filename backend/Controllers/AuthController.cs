using CharterBackend.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace CharterBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // Kontroler pokreće i dovršava prijavu korisnika putem Googlea
    public class AuthController : ControllerBase
    {
        // Povratak je dopušten samo na unaprijed definirane adrese
        private static readonly string[] AllowedOrigins =
        {
            "http://localhost:5173",
            "http://localhost:8080",
            "https://charterly.site"
        };

        private readonly IAccountService _accountService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAccountService accountService, ILogger<AuthController> logger)
        {
            _accountService = accountService;
            _logger = logger;
        }

        // Sprječava preusmjeravanje korisnika na nepoznatu adresu
        private static bool IsAllowed(string returnUrl) => AllowedOrigins.Any(o => returnUrl == o || returnUrl.StartsWith(o + "/"));

        [HttpGet("login/google")]
        public IActionResult GoogleLogin([FromQuery] string returnUrl)
        {
            // Povratna adresa provjerava se prije pokretanja autentikacije
            if (!IsAllowed(returnUrl))
                return BadRequest();

            // Googleu se prosljeđuje adresa krajnje točke koja će obraditi povratak
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("GoogleLoginCallback", new { returnUrl })
            };

            // Pokreće se Google OAuth prijava.
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("login/google/callback")]
        public async Task<IActionResult> GoogleLoginCallback([FromQuery] string returnUrl)
        {
            // Povratna adresa ponovno se provjerava
            if (!IsAllowed(returnUrl))
                return BadRequest();

            // Preuzima se rezultat autentikacije koji je Google spremio u kontekst zahtjeva
            var result = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);
            if (!result.Succeeded)
            {
                _logger.LogWarning("Google autentikacija nije uspjela: {Error}", result.Failure?.Message);
                return Unauthorized();
            }

            try
            {
                // Lokalni račun se dohvaća ili stvara, a JWT se zapisuje u kolačić
                await _accountService.LoginWithGoogleAsync(result.Principal);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Prijava nije uspjela");
                return Problem(ex.ToString());
            }

            // Briše se privremeni kolačić koji je Google postavio tijekom autentikacije
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            // Povratak u klijentsku aplikaciju
            return Redirect(returnUrl);
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            return Ok(new
            {
                Mail = User.FindFirstValue(ClaimTypes.Email),
                Uloga = User.FindFirstValue(ClaimTypes.Role)
            });
        }
    }

}
