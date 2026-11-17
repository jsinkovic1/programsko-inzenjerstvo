namespace CharterBackend.Dtos
{
    public class FilterDTO
    {
        public string? VesselName { get; set; } = null;
        public string? HarborName { get; set; } = null;
        public string? PlaceName { get; set; } = null;
        public int? CapacityLower { get; set; } = null;
        public int? CapacityHigher { get; set; } = null;
        public int? CabinNumberLower { get; set; } = null;
        public int? CabinNumberHigher { get; set; } = null;
        public int? BedNumberLower { get; set; } = null;
        public int? BedNumberHigher { get; set; } = null;
        public string? model { get; set; } = null;
        public decimal? PriceLower { get; set; } = null;
        public decimal? PriceHigher { get; set; } = null;
        public DateTime? TimeFrom { get; set; } = null;
        public DateTime? TimeTo { get; set; } = null;
        public List<int>? HarborIds { get; set; } = null;
    }
}
