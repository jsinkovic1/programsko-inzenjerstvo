import '../App.css'
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import placeholder from "../assets/placeholder.svg";
import Header from "../components/Header.jsx";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/image-gallery.css';

import 'leaflet/dist/leaflet.css';
import "./Map.css"
import {MapContainer, TileLayer} from "react-leaflet";
import { useNavigate } from 'react-router-dom';

const position = [44.08714036163615, 15.150380435125484] /*za svaku luku individualno?? */

const images = [
  {
    original: placeholder,
    thumbnail: placeholder,
  },
  {
    original: placeholder,
    thumbnail: placeholder,
  },
  {
    original: placeholder,
    thumbnail: placeholder,
  },
  {
    original: placeholder,
    thumbnail: placeholder,
  },
  {
    original: placeholder,
    thumbnail: placeholder,
  },
];

const MyGallery = () => {
  return <ImageGallery
   items={images} 
   showPlayButton={false}
   showFullscreenButton={false}/>;
};


function Vessel() {
    const { id:boatId } = useParams();
    const boatUrl = `/api/plovilo/${boatId}`
    console.log(boatId)
    const [boat, setBoat] = useState(null)

    useEffect(() => {
        fetch(boatUrl).then(response => response.json()).then(data => {
            setBoat(data)
        })
    }, [boatUrl])

    console.log(boat)
    const navigate=useNavigate();

    
    var boatInfo = (boat) => (
        <div className = "flex flex-col p-4 m-2 w-full md:w-3/4 mx-auto gap-4 rounded-xl">
            <div className = "flex flex-col md:flex-row justify-between p-4 m-2 w-full mx-auto gap-4 rounded-xl">
                {/*stupac #1*/}
                <div className = "flex flex-col items-center md:items-start justify-center flex-1 w-auto gap-4 text-navy">
                    {MyGallery()}
                </div>

                {/*stupac #2*/}

                <div className="flex flex-col justify-between flex-1 w-full gap-3 p-6 rounded-md border border-gray-100 ">
                    <div className="font-title text-navy">
                        <h2 className="text-2xl font-title font-bold text-navy">
                            {boat.nazivplovila}
                        </h2>
                        <h3 className="text-lg mb-2 text-navy">
                            {boat.model} ({boat.godinaproizvodnje})
                        </h3>
                        <div>
                            <br/>
                            <br/>
                            Cijena najma po danu: {boat.dnevnacijenanajma}€ <br/>
                            Model: <br/>
                            Kapacitet: {boat.kapacitet} <br/>
                            Broj kabina: {boat.brojkabina} <br/>
                            Broj ležajeva: {boat.brojlezajeva} <br/><br/>
                        </div>
                    </div>
                    <button className = "bg-mainOrange hover:bg-amber-400 hover:cursor-pointer text-white font-semibold rounded-md px-4 py-2 w-full md:w-auto mt-2">
                        Rezerviraj
                    </button>
                </div>
            </div>  
            <div className = "relative w-full h-[400px]">
                <MapContainer id="map" className={"h-full"} center={position} zoom={13} scrollWheelZoom={true} zoomControl={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.thunderforest.com/" target="_blank">Thunderforest</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=100a2a4b0a6a4f76846b12b31fc115ff"
                    />
                </MapContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000]">
                    <button 
                    onClick={() => navigate('/map')}
                    className="bg-navy hover:bg-blue-900 text-white font-bold px-4 py-2 rounded-lg">
                        Prikaži na karti
                    </button>
                </div>
            </div>
        </div>
    )

    return (<>
    <Header/>
        <div className = "flex flex-col items-center gap-4 min-h-screen bg-white font-sans text-black">
            {boat ? boatInfo(boat) : <p>Loading data.....</p>}
        </div>
    </>)
}
export default Vessel;