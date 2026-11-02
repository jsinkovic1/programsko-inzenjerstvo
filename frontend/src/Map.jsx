import Header from "./Header.jsx";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {useEffect, useState} from "react";


function Map() {
    const [pins, setPins] = useState(null)

    useEffect(() => {
        fetch("/api/luka").then(response => response.json()).then(data => {
            setPins(data)
        })
    }, [])

    console.log(pins)

    try
    {
        var markers = pins.map(pin =>
            <Marker position={[parseFloat(pin["latituda"]), parseFloat(pin["longituda"])]}>
                <Popup>
                    {pin["nazivluke"]}
                </Popup>
            </Marker>)
    }
    catch
    {
        markers = ""
    }



    const position = [44.08714036163615, 15.150380435125484]


    return (<>
        <div className={"h-dvh w-dvw flex-col"}>
            <Header/>
            <MapContainer className={"h-dvh"} center={position} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers}
            </MapContainer>
        </div>

    </>)
}

export default Map;