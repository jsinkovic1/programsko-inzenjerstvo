namespace CharterBackend.Dtos
{
    public class PloviloDTO
    {
        public int Idplovila { get; set; }

        public string Nazivplovila { get; set; } = null!;

        public int Godinaproizvodnje { get; set; }

        public int Kapacitet { get; set; }

        public int Brojkabina { get; set; }

        public int Brojlezajeva { get; set; }

        public string Model { get; set; } = null!;

        public decimal Dnevnacijenanajma { get; set; }
        public int Idluke { get; set; }

        public int Idtipaplovila { get; set; }

        public int Idproizvodaca { get; set; }

    }
}
