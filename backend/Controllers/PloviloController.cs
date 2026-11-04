using CharterBackend.Data;
using CharterBackend.Dtos;
using CharterBackend.Mappers;
using CharterBackend.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data.Common;

namespace CharterBackend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class PloviloController : ControllerBase
	{
		private readonly AppDbContext ctx;
		private readonly SearchUtility searchUtility = new SearchUtility();

		public PloviloController(AppDbContext ctx)
		{
			this.ctx = ctx;
		}


		[HttpGet()]
		public async Task<IActionResult> GetAll()
		{
			List<PloviloDTO> vessels;

			try
			{
				vessels = await ctx.Plovila.Select(v => v.ToPloviloDTO()).ToListAsync();
			}
            catch (DbException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do greške prilikom dohvaćanja podataka");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do neočekivane greške na serveru");
            }
            return Ok(vessels);
		}

		[HttpGet("{id:int}")]
		public async Task<IActionResult> Get(int id)
		{
			PloviloDTO? vessel;
			try
			{
				vessel = await ctx.Plovila.Where(p => p.Idplovila == id).
												Select(p => p.ToPloviloDTO()).
												FirstOrDefaultAsync();
			}
            catch (DbException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do greške prilikom dohvaćanja podataka");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do neočekivane greške na serveru");
            }

			if (vessel == null) return NotFound("Plovilo nije pronađeno");

            return Ok(vessel);
        }

		[HttpGet("search")]
		public async Task<IActionResult> SearchForVesselName([FromQuery] string name)
		{
			var vessels =await ctx.Plovila.
								   Select(p => p.ToPloviloDTO()).
								   ToListAsync();

			var result = vessels.Where(v => searchUtility.LevenshteinDistance(v.Nazivplovila, name) <= 2);
			return Ok(result);
		}
	}
}

