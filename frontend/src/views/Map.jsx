import Header from "../components/Header.jsx";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {useEffect, useMemo, useState} from "react";
import "./Map.css"
import {DivIcon} from "leaflet/src/layer/index.js";
import placeholder from "../assets/placeholder.svg"
import DropdownDiv from "../components/DropdownDiv.jsx";
import {CardSmall} from "../components/Cards.jsx";
import Vessel from "../models/Vessel.js";
import RangeSlider from "../components/RangeSlider.jsx";


function VesselCard(vessel)
{
    return(
        <li>
            <div className={"h-40 bg-gray-100 m-1 rounded-lg flex flex-row overflow-hidden"}>
                <img src={placeholder} alt="placeholder" className={"h-full aspect-square"}>
                </img>

                <div className={"grow flex flex-col text-left m-1"}>
                    <div className={"font-title basis-10"}>{vessel["nazivplovila"]}</div>
                    <div className={"font-sans basis-15"}>
                        Kapacitet: {vessel["kapacitet"]}<br/>
                        Kabina: {vessel["brojkabina"]}<br/>
                        Ležajeva: {vessel["brojlezajeva"]}
                    </div>
                </div>
            </div>

        </li>)
}
function HarborMarker({ position, name, id }) {
    const [vesselCards, SetVesselCards] = useState("")

    useEffect(() => {
       fetch("/api/filter", {
            method: "POST",
            body: JSON.stringify({ harborIds: [id] }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(x => x.json()).then(json => SetVesselCards(json.map(x => VesselCard(x))))
    }, [id]);
    const eventHandlers = useMemo(() => ({
        async popupopen() {
            const response = await fetch("/api/filter", {
                method: "POST",
                body: JSON.stringify({ harborIds: [id] }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const json = await response.json()
            console.log(json)
            SetVesselCards(json.map(x => (<CardSmall vessel={new Vessel(x)} viewButton={true}/>)))
        }
    }), [id])

    const divIcon = new DivIcon({className: "marker", html: vesselCards.length})
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
    const [pins, setPins] = useState(null)

    useEffect(() => {
        fetch("/api/luka").then(response => response.json()).then(data => {
            setPins(data)
        })
    }, [])

    try {
        var markers = pins.map(pin => <HarborMarker position={[parseFloat(pin["latituda"]), parseFloat(pin["longituda"])]} name={pin["nazivluke"]} id={pin["idluke"]}/>)
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
                <input type="text" placeholder={"Naziv plovila"} className="text-input"/>
                <DropdownDiv header={"Filter"}>
                    Kapacitet
                    <RangeSlider min={1} max={10} step={1}/>
                    Kabina
                    <RangeSlider min={1} max={10} step={1}/>
                    Ležajeva
                    <RangeSlider min={1} max={10} step={1}/>
                </DropdownDiv>
            </div>
        </div>

    </>)
}

export default Map;