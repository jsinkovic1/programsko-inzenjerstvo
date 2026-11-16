using CharterBackend.Models;
using System;

public class Imadodatneusluge
{
	public int idusluge { get; set; }

	public int idtermina { get; set; }

	public decimal cijenadodatneusluge { get; set; }

	public Usluga Usluga { get; set; } = null!;

	public Rezervacija Rezervacija { get; set; } = null!;
}
