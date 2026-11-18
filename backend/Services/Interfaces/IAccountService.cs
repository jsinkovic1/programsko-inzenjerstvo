using System.Security.Claims;

namespace CharterBackend.Services.Interfaces
{
    public interface IAccountService
    {
        Task LoginWithGoogleAsync(ClaimsPrincipal? principal);
    }
}
