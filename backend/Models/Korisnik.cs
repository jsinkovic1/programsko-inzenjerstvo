using System;
using System.Collections.Generic;

namespace CharterBackend.Models;

public partial class Korisnik
{
    public int Idkorisnika { get; set; }

    public string Username { get; set; } = null!;

    public string Ime { get; set; } = null!;

    public string Prezime { get; set; } = null!;

    public string Mail { get; set; } = null!;

    public bool Aktivan { get; set; }

    public string Uloga { get; set; } = null!;

    public virtual ICollection<Rezervacija> Rezervacije { get; set; } = new List<Rezervacija>();
}
