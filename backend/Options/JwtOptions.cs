namespace CharterBackend.Options
{
    // Sadrži postavke potrebne za izradu i provjeru JWT tokena
    public class JwtOptions
    {
        // Naziv konfiguracijskog odjeljka u kojem se nalaze JWT postavke
        public const string JwtOptionsKey = "Jwt";

        // Izdavatelj tokena koji se provjerava prilikom autentikacije
        public string Issuer { get; set; } = null!;

        // Publika kojoj je token namijenjen
        public string Audience { get; set; } = null!;

        // Tajni ključ kojim se token potpisuje i čiji se potpis provjerava
        public string Secret { get; set; } = null!;
    }
}
