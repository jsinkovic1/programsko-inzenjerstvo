using CharterBackend.Data;
using CharterBackend.Dtos;
using CharterBackend.Mappers;
using CharterBackend.Models;
using FuzzySharp;
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

            if (filterDTO.CapacityLower.HasValue) query = query.Where(v => v.Kapacitet >= filterDTO.CapacityLower);
            if (filterDTO.CapacityHigher.HasValue) query = query.Where(v => v.Kapacitet <= filterDTO.CapacityHigher);
            if (filterDTO.CabinNumberLower.HasValue) query = query.Where(v => v.Brojkabina >= filterDTO.CabinNumberLower);
            if (filterDTO.CabinNumberHigher.HasValue) query = query.Where(v => v.Brojkabina <= filterDTO.CabinNumberHigher);
            if (filterDTO.BedNumberLower.HasValue) query = query.Where(v => v.Brojlezajeva >= filterDTO.BedNumberLower);
            if (filterDTO.BedNumberHigher.HasValue) query = query.Where(v => v.Brojlezajeva <= filterDTO.BedNumberHigher);
            if (filterDTO.PriceLower.HasValue) query = query.Where(v => v.Dnevnacijenanajma >=  filterDTO.PriceLower);
            if (filterDTO.PriceHigher.HasValue) query = query.Where(v => v.Dnevnacijenanajma <= filterDTO.PriceHigher);
            if (filterDTO.HarborIds != null) query = query.Where(v => filterDTO.HarborIds.Contains(v.Idluke));
            if(filterDTO.TimeFrom.HasValue && filterDTO.TimeTo.HasValue)
            {
                if (filterDTO.TimeFrom.Value > filterDTO.TimeTo.Value) return StatusCode(StatusCodes.Status400BadRequest, "Vrijednost datuma polaska ne smije biti veća od datuma povratka");
                query = query.Where(v => !v.Termini.Any(t =>
                                                    t.Vrijemeod < filterDTO.TimeTo &&
                                                    t.Vrijemedo > filterDTO.TimeFrom));
            }
            List<Plovilo> vessels;
            try
            {
                vessels = await query.ToListAsync();
            } catch(DbException  ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do greške prilikom dohvaćanja podataka");
            } catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do neočekivane greške na serveru");
            }

            if (!string.IsNullOrEmpty(filterDTO.VesselName))
            {
                vessels = vessels.Where(v => Fuzz.WeightedRatio(v.Nazivplovila, filterDTO.VesselName, FuzzySharp.PreProcess.PreprocessMode.Full) >= 70).ToList();
            }
            if (!string.IsNullOrEmpty(filterDTO.HarborName))
            {
                vessels = vessels.Where(v => Fuzz.WeightedRatio(v.Luka.Nazivluke, filterDTO.HarborName, FuzzySharp.PreProcess.PreprocessMode.Full) >= 70).ToList();
            }
            if (!string.IsNullOrEmpty(filterDTO.PlaceName))
            {
                vessels = vessels.Where(v => Fuzz.WeightedRatio(v.Luka.Mjesto, filterDTO.PlaceName, FuzzySharp.PreProcess.PreprocessMode.Full) >= 70).ToList();
            }
            if (!string.IsNullOrEmpty(filterDTO.model))
            {
                vessels = vessels.Where(v => Fuzz.WeightedRatio(v.Model, filterDTO.model, FuzzySharp.PreProcess.PreprocessMode.Full) >= 70).ToList();
            }

            var result = vessels.Select(v => v.ToPloviloDTO()).ToList();
            return Ok(result);
        }
    }
}
