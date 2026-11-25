import Header from "../components/Header.jsx";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {useEffect, useMemo, useState} from "react";
import "./Map.css"
import {DivIcon} from "leaflet/src/layer/index.js";
import {CardSmall} from "../components/Cards.jsx";
import Vessel from "../models/Vessel.js";
import RangeSlider from "../components/RangeSlider.jsx";
import Accordion from "../components/Accordion.jsx";
import CheckboxGroup from "../components/CheckboxGroup.jsx";


function HarborMarker({position, name, id, filter}) {
    const [vesselCards, SetVesselCards] = useState("")

    useEffect(() => {
        fetch("/api/filter", {
            method: "POST",
            body: JSON.stringify({
                ...filter,
                harborIds: [id]
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(x => x.json()).then(json => SetVesselCards(json.map(x => (
            <CardSmall vessel={new Vessel(x)} viewButton={true}/>))))
    }, [filter, id]);
    const eventHandlers = useMemo(() => ({
        async popupopen() {
            const response = await fetch("/api/filter", {
                method: "POST",
                body: JSON.stringify({
                    ...filter,
                    HarborIds: [id]
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const json = await response.json()
            console.log(json)
            SetVesselCards(json.map(x => (<CardSmall vessel={new Vessel(x)} viewButton={true}/>)))
        }
    }), [filter, id])

    const divIcon = new DivIcon({
        className: vesselCards.length > 0 ? "marker" : "marker-disabled",
        html: vesselCards.length
    })
    return (
        <Marker eventHandlers={eventHandlers} position={position} icon={divIcon} bind>
            <Popup closeButton={false}>
                <div className={"flex flex-col h-full p-2 gap-2 overflow-y-scroll"}>
                    <div className={"font-title text-lg border-b-1 border-b-gray-300 rounded-md text-center"}>
                        {name}
                    </div>
                    {vesselCards}
                </div>

            </Popup>
        </Marker>)
}

const EMPTY_FILTER = {
    VesselName: null,
    CapacityLower: null,
    CapacityHigher: null,
    CabinNumberLower: null,
    CabinNumberHigher: null,
    BedNumberLower: null,
    BedNumberHigher: null,
    model: null,
    PriceLower: null,
    PriceHigher: null,
    VesselTypes: null,
}

// Donje granice klizača: kapacitet je u bazi uvijek barem 1, a broj kabina i ležajeva može biti 0
const MIN_CAPACITY = 1
const MIN_CABINS = 0
const MIN_BEDS = 0

function Map() {
    const [filter, setFilter] = useState(EMPTY_FILTER)
    const [pins, setPins] = useState(null)
    const [vesselTypes, setVesselTypes] = useState(null)
    // Gornje granice klizača uzimaju se iz kataloga (najveće vrijednosti), a 10 je samo početna vrijednost dok podaci ne stignu
    const [limits, setLimits] = useState({capacity: 10, cabins: 10, beds: 10})

    useEffect(() => {
        fetch("/api/luka").then(response => response.json()).then(data => {
            setPins(data)
        })
    }, [])

    useEffect(() => {
        fetch("/api/plovilo/tipplovila").then(response => response.json()).then(data => {
            setVesselTypes(data)
        })
    }, [])

    useEffect(() => {
        fetch("/api/plovilo")
            .then(response => response.ok ? response.json() : [])
            .then(data => {
                if (data.length === 0) return
                setLimits({
                    capacity: Math.max(...data.map(v => v.kapacitet)),
                    cabins: Math.max(...data.map(v => v.brojkabina)),
                    beds: Math.max(...data.map(v => v.brojlezajeva))
                })
            })
            .catch(() => {
            })
    }, [])

    // Vraća onChange za klizač: ručica na rubu raspona znači „bez ograničenja" (null),
    // inače se u filtar upisuje odabrana granica
    const rangeHandler = (lowKey, highKey, min, max) => (low, high) =>
        setFilter(current => ({
            ...current,
            [lowKey]: low <= min ? null : low,
            [highKey]: high >= max ? null : high
        }))

    // Tekst uz naziv klizača, npr. „2 – 8"
    const rangeLabel = (low, high, min, max) => `${low ?? min} - ${high ?? max}`

    try {
        var markers = pins.map(pin => <HarborMarker
            position={[parseFloat(pin["latituda"]), parseFloat(pin["longituda"])]} name={pin["nazivluke"]}
            id={pin["idluke"]} filter={filter}/>)
    } catch {
        markers = ""
    }

    const position = [44.08714036163615, 15.150380435125484]

    return (<>
        <div className={"h-full flex flex-col"}>
            <Header/>
            <title>Karta luka | Charterly</title>
            <MapContainer id="map" className={"h-full"} center={position} zoom={13} scrollWheelZoom={true}
                          zoomControl={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.thunderforest.com/" target="_blank">Thunderforest</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=100a2a4b0a6a4f76846b12b31fc115ff"
                />
                {markers}
            </MapContainer>

            <div className={"w-70 absolute z-1000 top-16 flex flex-col gap-2 p-2"}>
                <input type="text" value={filter.VesselName ?? ""} onChange={(e) => {
                    const value = e.target.value
                    setFilter(current => ({...current, VesselName: value.length > 0 ? value : null}))
                }} placeholder={"Naziv plovila"} className="text-input"/>
                <Accordion header={"Filter"}>
                    Kapacitet: {rangeLabel(filter.CapacityLower, filter.CapacityHigher, MIN_CAPACITY, limits.capacity)}
                    <RangeSlider
                        min={MIN_CAPACITY}
                        max={limits.capacity}
                        step={1}
                        valueLow={filter.CapacityLower ?? MIN_CAPACITY}
                        valueHigh={filter.CapacityHigher ?? limits.capacity}
                        onChange={rangeHandler("CapacityLower", "CapacityHigher", MIN_CAPACITY, limits.capacity)}
                    />
                    Kabina: {rangeLabel(filter.CabinNumberLower, filter.CabinNumberHigher, MIN_CABINS, limits.cabins)}
                    <RangeSlider
                        min={MIN_CABINS}
                        max={limits.cabins}
                        step={1}
                        valueLow={filter.CabinNumberLower ?? MIN_CABINS}
                        valueHigh={filter.CabinNumberHigher ?? limits.cabins}
                        onChange={rangeHandler("CabinNumberLower", "CabinNumberHigher", MIN_CABINS, limits.cabins)}
                    />
                    Ležajeva: {rangeLabel(filter.BedNumberLower, filter.BedNumberHigher, MIN_BEDS, limits.beds)}
                    <RangeSlider
                        min={MIN_BEDS}
                        max={limits.beds}
                        step={1}
                        valueLow={filter.BedNumberLower ?? MIN_BEDS}
                        valueHigh={filter.BedNumberHigher ?? limits.beds}
                        onChange={rangeHandler("BedNumberLower", "BedNumberHigher", MIN_BEDS, limits.beds)}
                    />

                    Dnevna
                    Cijena: {rangeLabel(filter.PriceLower, filter.PriceHigher, 0, 9999) /* privremena granica cijene, u budućnosti dinamički po najskupljem u bazi podataka*/}
                    <RangeSlider
                        min={0}
                        max={9999}
                        step={25}
                        valueLow={filter.PriceLower ?? 0}
                        valueHigh={filter.PriceHigher ?? 9999}
                        onChange={rangeHandler("PriceLower", "PriceHigher", 0, 9999)}
                    />

                    Vrsta plovila:
                    <CheckboxGroup onChange={(checked) => setFilter(current => ({
                        ...current,
                        VesselTypes: checked
                    }))} options={vesselTypes != null ? vesselTypes.map(x => x["nazivtipaplovila"]) : []}/>


                    <button className={"button"} onClick={() => setFilter(EMPTY_FILTER)}>Reset</button>
                </Accordion>
            </div>
        </div>

    </>)
}

export default Map;