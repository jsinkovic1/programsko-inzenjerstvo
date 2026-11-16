using CharterBackend.Models;
using System;
public class Imadodatnuopremu
{
	public int idopreme { get; set; }

	public int idtermina { get; set; }

	public int kolicinaopreme { get; set; }

	public decimal cijenadodatneopreme { get; set; }

	public Oprema Oprema { get; set; } = null!;

	public Rezervacija Rezervacija { get; set; } = null!;
}
