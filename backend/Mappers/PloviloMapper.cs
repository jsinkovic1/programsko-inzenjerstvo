using CharterBackend.Dtos;
using CharterBackend.Models;
using System.Reflection.Metadata.Ecma335;

namespace CharterBackend.Mappers
{
    public static class PloviloMapper
    {
        public static PloviloDTO ToPloviloDTO(this Plovilo ploviloModel)
        {
            return new PloviloDTO
            {
                Idplovila = ploviloModel.Idplovila,
                Nazivplovila = ploviloModel.Nazivplovila,
                Kapacitet = ploviloModel.Kapacitet,
                Brojkabina = ploviloModel.Brojkabina,
                Brojlezajeva = ploviloModel.Brojlezajeva,
                Model = ploviloModel.Model,
                Dnevnacijenanajma = ploviloModel.Dnevnacijenanajma,
                Godinaproizvodnje = ploviloModel.Godinaproizvodnje,
                Idluke = ploviloModel.Idluke,
                Idproizvodaca = ploviloModel.Idproizvodaca,
                Idtipaplovila = ploviloModel.Idtipaplovila
            };
        }
    }
}
