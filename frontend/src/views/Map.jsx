import Header from "../components/Header.jsx";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {useEffect, useMemo, useState} from "react";
import "./Map.css"
import {DivIcon} from "leaflet/src/layer/index.js";
import placeholder from "../assets/placeholder.svg"
import {CardSmall} from "../components/Cards.jsx";
import Vessel from "../models/Vessel.js";
import RangeSlider from "../components/RangeSlider.jsx";
import Accordion from "../components/Accordion.jsx";


function HarborMarker({ position, name, id, filter}) {
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
        }).then(x => x.json()).then(json => SetVesselCards(json.map(x => (<CardSmall vessel={new Vessel(x)} viewButton={true}/>))))
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

    const divIcon = new DivIcon({className: vesselCards.length > 0 ? "marker" : "marker-disabled", html: vesselCards.length})
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

function Map() {
    const [filter, setFilter] = useState({
        VesselName: "",
        CapacityLower: null,
        CapacityHigher: null,
        CabinNumberLower: null,
        CabinNumberHigher: null,
        BedNumberLower: null,
        BedNumberHigher: null
    })
    const [pins, setPins] = useState(null)
    
    console.log(filter)

    useEffect(() => {
        fetch("/api/luka").then(response => response.json()).then(data => {
            setPins(data)
        })
    }, [])

    try {
        var markers = pins.map(pin => <HarborMarker position={[parseFloat(pin["latituda"]), parseFloat(pin["longituda"])]} name={pin["nazivluke"]} id={pin["idluke"]} filter={filter}/>)
    } catch {
        markers = ""
    }

    const position = [44.08714036163615, 15.150380435125484]

    return (<>
        <div className={"h-full flex flex-col"}>
            <Header/>
            <MapContainer id="map" className={"h-full"} center={position} zoom={13} scrollWheelZoom={true} zoomControl={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.thunderforest.com/" target="_blank">Thunderforest</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=100a2a4b0a6a4f76846b12b31fc115ff"
                />
                {markers}
            </MapContainer>

            <div className={"w-70 absolute z-1000 top-16 flex flex-col gap-2 p-2"}>
                <input type="text" onChange={(e) => setFilter(
                {
                        ...filter,
                        VesselName: e.target.value.length > 0 ? e.target.value : null
                    }
                )} placeholder={"Naziv plovila"} className="text-input"/>
                <Accordion header={"Filter"}>
                    Kapacitet
                    <RangeSlider onChange={(min, max) => {
                        let newFilter = {
                            ...filter,
                            CapacityLower: min,
                            CapacityHigher: max
                        };
                        setFilter(newFilter)
                    }} min={1} max={10} step={1}/>
                    Kabina
                    <RangeSlider onChange={(min, max) => {
                        let newFilter = {
                            ...filter,
                            CabinNumberLower: min,
                            CabinNumberHigher: max
                        };
                        setFilter(newFilter)
                    }} min={1} max={10} step={1}/>
                    Ležajeva
                    <RangeSlider onChange={(min, max) => {
                        let newFilter = {
                            ...filter,
                            BedNumberLower: min,
                            BedNumberHigher: max
                        };
                        setFilter(newFilter)
                    }} min={1} max={10} step={1}/>
                    <button className={"button"} onClick={() => setFilter({
                        VesselName: "",
                        CapacityLower: null,
                        CapacityHigher: null,
                        CabinNumberLower: null,
                        CabinNumberHigher: null,
                        BedNumberLower: null,
                        BedNumberHigher: null
                    })}>Reset</button>
                </Accordion>
            </div>
        </div>

    </>)
}

export default Map;