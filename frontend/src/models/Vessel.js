
export default class Vessel
{
    constructor(data)
    {
        this.id = data.idplovila
        this.name = data.nazivplovila
        this.yearofproduction = data.godinaproizvodnje
        this.capacity = data.kapacitet
        this.rooms = data.brojkabina
        this.beds = data.brojlezajeva
        this.model = data.model
        this.dailycost = data.dnevnacijenanajma
        this.harborId = data.idluke
        this.typeId = data.idtipaplovila
        this.manufacturerId = data.idproizvodaca
    }

    static async GetById(id)
    {
        const res = await fetch(`/api/plovilo/${id}`)
        const json = await res.json()
        return new Vessel(json)
    }
}