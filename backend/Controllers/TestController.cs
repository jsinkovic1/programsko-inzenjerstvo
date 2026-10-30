using CharterBackend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics;
using Microsoft.AspNetCore.Cors;

namespace CharterBackend.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        [EnableCors("Default")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var res = new
            {
                time = DateTime.Now,
                start_time = Process.GetCurrentProcess().StartTime,
                foo = "bar",
                test = true
            };
            
            return Ok(res);
        }

    }
}