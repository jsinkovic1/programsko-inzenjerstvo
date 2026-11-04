namespace CharterBackend.Dtos
{
    public class FilterDTO
    {
        public string? VesselName { get; set; } = null;
        public string? HarborName { get; set; } = null;
        public string? PlaceName { get; set; } = null;
        public int? Capacity { get; set; } = null;
        public int? CabinNumber { get; set; } = null;
        public int? BedNumber { get; set; } = null;
        public string? model { get; set; } = null;
        public decimal? PriceLower { get; set; } = null;
        public decimal? PriceHigher { get; set; } = null;
        public DateTime? TimeFrom { get; set; } = null;
        public DateTime? TimeTo { get; set; } = null;
    }
}
