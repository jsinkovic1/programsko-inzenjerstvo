import '../App.css'
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import placeholder from "../assets/placeholder.svg";
import Header from "../components/Header.jsx";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/image-gallery.css';


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

    
    var boatInfo = (boat) => (
        <div className = "flex flex-col md:flex-row items-center justify-between p-4 m-2 w-full md:w-3/4 mx-auto gap-4 shadow-lg rounded-xl border border-gray-100">
            
            {/*stupac #1*/}
            <div className = "flex flex-col items-center md:items-start justify-center flex-1 w-full gap-4 text-navy">
                <h2 className="text-2xl font-title font-bold">
                    {boat.nazivplovila}
                </h2>
                {MyGallery()}
            </div>

            {/*stupac #2*/}

            <div className="flex flex-col justify-center flex-1 w-full gap-3 p-6 rounded-md border border-gray-100">
                <h3 className="text-lg mb-2 text-mainOrange">
                    Specifikacije plovila
                </h3>
                Cijena najma po danu: {boat.dnevnacijenanajma}€ <br/>
                Model: {boat.model} ({boat.godinaproizvodnje})<br/>
                Kapacitet: {boat.kapacitet} <br/>
                Broj kabina: {boat.brojkabina} <br/>
                Broj ležajeva: {boat.brojlezajeva} <br/><br/>
                <button className = "bg-mainOrange hover:bg-orange-20 text-white font-semibold rounded-md px-4 py-2 w-full md:w-auto mt-2">
                    Rezerviraj
                </button>
            </div>
        </div>
    )

    return (<>
    <Header/>
        <div className = "flex flex-col items-center gap-4 min-h-screen bg-white font-sans text-black">
            {boat ? boatInfo(boat) : <p>Loading boat data...</p>}
        </div>
    </>)
}
export default Vessel;