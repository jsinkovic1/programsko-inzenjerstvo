import Header from "../components/Header.jsx";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {useEffect, useMemo, useState} from "react";
import "./Map.css"
import {Icon} from "leaflet/src/layer/index.js";
import markerSvg from "../assets/marker.svg"
import placeholder from "../assets/placeholder.svg"


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
    const icon = new Icon({
        iconUrl: markerSvg,
        iconSize:     [50, 50], // size of the icon
        shadowSize:   [0, 0], // size of the shadow
        iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
        shadowAnchor: [50, 50],  // the same for the shadow
        popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    });
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
            SetVesselCards(json.map(x => VesselCard(x)))
        },
    }), [name])

    return (
        <Marker eventHandlers={eventHandlers} position={position}  icon={icon}>
            <Popup closeButton={false}>
                <div className={"absolute -top-8 w-auto h-16 -z-1 bg-white rounded-xl text-2xl pl-1 pr-1"}>
                    {name}
                </div>
                <ul className={"w-full h-full flex-col overflow-y-scroll rounded-xl"}>
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
        <div className={"h-dvh w-dvw flex-col"}>
            <Header/>
            <MapContainer id="map" className={"h-dvh"} center={position} zoom={13} scrollWheelZoom={true}>
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