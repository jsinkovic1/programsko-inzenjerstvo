import Header from "../components/Header.jsx";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {useEffect, useMemo, useState} from "react";
import "./Map.css"
import {DivIcon} from "leaflet/src/layer/index.js";
import placeholder from "../assets/placeholder.svg"
import Accordion from "../components/Accordion.jsx";
import {CardSmall} from "../components/Cards.jsx";
import Vessel from "../models/Vessel.js";


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
function HarborMarker({ position, name }) {
    const [vesselCards, SetVesselCards] = useState("")

    useEffect(() => {
       fetch("/api/filter", {
            method: "POST",
            body: JSON.stringify({ harborName: name }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(x => x.json()).then(json => SetVesselCards(json.map(x => VesselCard(x))))
    }, [name]);
    const eventHandlers = useMemo(() => ({
        async popupopen() {
            const response = await fetch("/api/filter", {
                method: "POST",
                body: JSON.stringify({ harborName: name }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const json = await response.json()
            console.log(json)
            SetVesselCards(json.map(x => (<CardSmall vessel={new Vessel(x)}/>)))
        }
    }), [name])

    const divIcon = new DivIcon({className: "marker", html: vesselCards.length})
    return (
        <Marker eventHandlers={eventHandlers} position={position} icon={divIcon}>
            <Popup closeButton={false}>
                <div className={"absolute -top-8 w-auto h-16 -z-1 bg-white rounded-xl text-2xl pl-1 pr-1"}>
                    {name}
                </div>
                <ul className={"flex flex-col overflow-y-scroll rounded-xl"}>
                    {vesselCards}
                </ul>

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
        var markers = pins.map(pin => <HarborMarker position={[parseFloat(pin["latituda"]), parseFloat(pin["longituda"])]} name={pin["nazivluke"]}/>)
    } catch {
        markers = ""
    }


    const position = [44.08714036163615, 15.150380435125484]

    return (<>
        <div className={"h-full flex flex-col"}>
            <Header/>
            <MapContainer id="map" className={"h-full"} center={position} zoom={13} scrollWheelZoom={true} zoomControl={false}>
                <div className={"w-70 absolute z-1000 flex flex-col gap-2 p-2"}>
                    <input type="text" placeholder={"Naziv plovila"} className="text-input"/>
                    <Accordion header={"Filter"}>
                        <p>test test</p>
                        <p>test test</p>
                        <p>test test</p>
                        <p>test test</p>
                    </Accordion>
                </div>
                <TileLayer
                    attribution='&copy; <a href="https://www.thunderforest.com/" target="_blank">Thunderforest</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=100a2a4b0a6a4f76846b12b31fc115ff"
                />
                {markers}
            </MapContainer>
        </div>

    </>)
}

export default Map;