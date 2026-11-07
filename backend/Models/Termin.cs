using System;
using System.Collections.Generic;

namespace CharterBackend.Models;

public partial class Termin
{
    public int Idtermina { get; set; }

    public DateTime Vrijemeod { get; set; }

    public DateTime Vrijemedo { get; set; }

    public string Status { get; set; } = null!;

    public int Idplovila { get; set; }

    public virtual Plovilo Plovilo { get; set; } = null!;

    public virtual Nedostupnitermin? Nedostupnitermin { get; set; }

    public virtual Rezervacija? Rezervacija { get; set; }
}
