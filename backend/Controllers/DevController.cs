using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc.Controllers;

namespace CharterBackend.Controllers
{
    [ApiController]
    [Route("api/dev")]
    public class DevController : ControllerBase
    {
        private readonly IEnumerable<EndpointDataSource> _endpointSources;

        public DevController(IEnumerable<EndpointDataSource> endpointSources)
        {
            _endpointSources = endpointSources;
        }
        
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
        
        // Veliki dio kopiran iz https://stackoverflow.com/questions/28435734/how-to-get-a-list-of-all-routes-in-asp-net-core
        [HttpGet("endpoints")]
        public async Task<IActionResult> GetEndpoints()
        {
            var endpoints = _endpointSources
                .SelectMany(es => es.Endpoints)
                .OfType<RouteEndpoint>();
            var output = endpoints.Select(
                e =>
                {
                    var controller = e.Metadata
                        .OfType<ControllerActionDescriptor>()
                        .FirstOrDefault();
                    var action = controller != null
                        ? $"{controller.ControllerName}.{controller.ActionName}"
                        : null;
                    var method = e.Metadata.OfType<HttpMethodMetadata>().FirstOrDefault()?.HttpMethods?[0];
                    var route = $"/{e.RoutePattern.RawText.TrimStart('/')}";
                    return $"{method} {route} -> {action}";
                }
            );
            output = output.OrderBy(x => x.Split()[0]);
            return Ok(string.Join('\n', output));
        }
        
        

    }
}