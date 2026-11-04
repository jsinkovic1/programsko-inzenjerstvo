using CharterBackend.Data;
using CharterBackend.Dtos;
using CharterBackend.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace CharterBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilterController: ControllerBase
    {
        private readonly AppDbContext ctx;
        public FilterController(AppDbContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpPost]
        public async Task<IActionResult> GetFIlteredVessels([FromBody] FilterDTO filterDTO)
        {
            var query = ctx.Plovila.Include(v => v.Luka).Include(v => v.Termini).AsQueryable();

            if (!string.IsNullOrEmpty(filterDTO.VesselName)) query = query.Where(v => v.Nazivplovila == filterDTO.VesselName);
            if (!string.IsNullOrEmpty(filterDTO.HarborName)) query = query.Where(v => v.Luka.Nazivluke == filterDTO.HarborName);
            if (!string.IsNullOrEmpty(filterDTO.PlaceName)) query = query.Where(v => v.Luka.Mjesto == filterDTO.PlaceName);
            if (!string.IsNullOrEmpty(filterDTO.model)) query = query.Where(v => v.Model == filterDTO.model);
            if (filterDTO.Capacity.HasValue) query = query.Where(v => v.Kapacitet >= filterDTO.Capacity);
            if (filterDTO.CabinNumber.HasValue) query = query.Where(v => v.Brojkabina >= filterDTO.CabinNumber);
            if (filterDTO.BedNumber.HasValue) query = query.Where(v => v.Brojlezajeva >= filterDTO.BedNumber);
            if (filterDTO.PriceLower.HasValue) query = query.Where(v => v.Dnevnacijenanajma >=  filterDTO.PriceLower);
            if (filterDTO.PriceHigher.HasValue) query = query.Where(v => v.Dnevnacijenanajma <= filterDTO.PriceHigher);
            if(filterDTO.TimeFrom.HasValue && filterDTO.TimeTo.HasValue)
            {
                if (filterDTO.TimeFrom.Value > filterDTO.TimeTo.Value) return StatusCode(StatusCodes.Status400BadRequest, "Vrijednost datuma polaska ne smije biti veća od datuma povratka");
                query = query.Where(v => !v.Termini.Any(t =>
                                                    t.Vrijemeod < filterDTO.TimeTo &&
                                                    t.Vrijemedo > filterDTO.TimeFrom));
            }
            List<PloviloDTO> vessels;
            try
            {
                vessels = await query.Select(v => v.ToPloviloDTO()).ToListAsync();
            } catch(DbException  ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do greške prilikom dohvaćanja podataka");
            } catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do neočekivane greške na serveru");
            }

            return Ok(vessels);
        }
    }
}
