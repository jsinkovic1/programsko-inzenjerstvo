using CharterBackend.Dtos;
using CharterBackend.Models;
using System.Runtime.CompilerServices;

namespace CharterBackend.Mappers
{
    public static class LukaMapper
    {
        public static LukaDTO ToLukaDTO(this Luka lukaModel)
        {
            return new LukaDTO
            {
                Idluke = lukaModel.Idluke,
                Latituda = lukaModel.Latituda,
                Longituda = lukaModel.Longituda,
                Mjesto = lukaModel.Mjesto,
                Nazivluke = lukaModel.Nazivluke
            };
        }
    }
}
