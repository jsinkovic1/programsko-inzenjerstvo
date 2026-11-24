using CharterBackend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CharterBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext ctx;

        public UserController(AppDbContext ctx)
        {
            this.ctx = ctx;
        }

        // Admin može deaktivirati korisnika
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var korisnik = await ctx.Korisnici.FindAsync(id);

            if (korisnik == null)
            {
                return NotFound();
            }

            korisnik.Aktivan = false;
            await ctx.SaveChangesAsync();

            return NoContent();
        }

        // Korisnik može deaktivirati svoj račun
        [Authorize]
        [HttpDelete("me")]
        public async Task<IActionResult> DeleteYourself()
        {
            // User je trenutno prijavljeni korisnik, a njegov ID se dohvaća iz tokena
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var korisnik = await ctx.Korisnici.FindAsync(id);

            if (korisnik == null)
            {
                return NotFound();
            }

            korisnik.Aktivan = false;
            await ctx.SaveChangesAsync();

            Response.Cookies.Delete("ACCESS_TOKEN");
            return NoContent();
        }
    }
}
