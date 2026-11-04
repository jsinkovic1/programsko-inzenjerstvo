using CharterBackend.Data;
using CharterBackend.Dtos;
using CharterBackend.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace CharterBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LukaController: ControllerBase
    {
        private readonly AppDbContext ctx;
        public LukaController(AppDbContext ctx) 
        {
            this.ctx = ctx;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllHarbors()
        {
            List<LukaDTO> harbors;

            try
            {
                harbors = await ctx.Luke.Select(h => h.ToLukaDTO()).ToListAsync();
            }
            catch (DbException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do greške prilikom dohvaćanja podataka");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do neočekivane greške na serveru");
            }

            return Ok(harbors);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetHarborById(int id)
        {
            LukaDTO? harbor;

            try
            {
                harbor = await ctx.Luke.Where(h => h.Idluke == id).Select(h => h.ToLukaDTO()).FirstOrDefaultAsync();
            }
            catch (DbException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do greške prilikom dohvaćanja podataka");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do neočekivane greške na serveru");
            }

            if (harbor == null) return NotFound("Luka nije pronađena");

            return Ok(harbor);
        }

    }
}
