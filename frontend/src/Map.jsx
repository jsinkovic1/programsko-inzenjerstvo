import Header from "./Header.jsx";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {useEffect, useMemo, useState} from "react";


function HarborPin({ position, name }) {
    const [vesselNames, SetVesselNames] = useState("")
    const eventHandlers = useMemo(() => ({
        async popupopen() {
            console.log(name)
            const response = await fetch("/api/filter", {
                method: "POST",
                body: JSON.stringify({ harborName: name }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const json = await response.json()
            console.log(json)
            SetVesselNames(json.map(x => (<li>{x["nazivplovila"]}</li>)))
        },
    }), [])

    return (
        <Marker eventHandlers={eventHandlers} position={position}>
            <Popup>
                <h2>{name}</h2>
                <hr />
                <ul>
                    {vesselNames}
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
        var markers = pins.map(pin => <HarborPin position={[parseFloat(pin["latituda"]), parseFloat(pin["longituda"])]} name={pin["nazivluke"]}/>)
    } catch {
        markers = ""
    }


    const position = [44.08714036163615, 15.150380435125484]

    return (<>
        <div className={"h-dvh w-dvw flex-col"}>
            <Header/>
            <MapContainer id="map" className={"h-dvh"} center={position} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                />
                {markers}
            </MapContainer>
        </div>

    </>)
}

export default Map;