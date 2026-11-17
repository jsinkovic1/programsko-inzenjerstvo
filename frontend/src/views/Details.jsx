import '../App.css'
import Header from "../components/Header.jsx";
import {useEffect, useState} from "react";
import placeholder from "../assets/placeholder.svg";
import { useNavigate } from 'react-router-dom';
import Search from "./Search"

function Details()
{
    const [boats, setBoats] = useState([])
    const navigate=useNavigate()

    const[search, setSearch] = useState("")

    useEffect(() => {
        fetch("/api/plovilo").then(response => response.json()).then(data => {
            setBoats(data)
        })
    }, [])

    var dani = 2

    const boatDisplay = boats.filter((boat) => boat.nazivplovila.toLowerCase().includes(search.toLowerCase()))
    console.log(boatDisplay) 

    try {
        var cards = boatDisplay.map(boat =>
            <div key={boat.idplovila} className = "flex flex-col md:flex-row items-center md:items-start justify-between rounded-md shadow-md p-4 m-2 w-3/4 mx-auto gap-4">
                {/*prvi stupac */}
                <img src={placeholder} alt="boat" className="w-4/5 md:w-1/5 rounded-md object-contain" />
                
                {/*drugi stupac */}
                <div className="flex flex-col justify-between flex-1 w-full gap-6 m-4 md:m-8">
                    <div>
                        <h1 className = "hover:text-blue-950 hover:cursor-pointer text-blue-900 font-title text-[clamp(16px,2vw,22px)] font-bold">
                            <a href={`/vessel/${boat.idplovila}`}>{boat["nazivplovila"]}</a>
                        </h1>
                        <div className="text-sm text-amber-500 mt-1 flex items-center gap-1">
                            {boat["model"]} - {boat["godinaproizvodnje"]} god.
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                            Broj kabina: {boat["brojkabina"]} 
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                            Broj ležajeva: {boat["brojlezajeva"]} 
                        </div>
                    </div>
                </div>

                {/*treci stupac */}
                <div className="flex flex-col md:justify-between items-center md:items-end w-full md:w-auto h-full gap-4 mt-2 md:mt-0">
                    <div className="flex md:flex-col items-center md:items-end justify-between w-full gap-2">
                        <h1 className = "text-navy font-title text-base">
                            (ime luke)
                        </h1>
                        <div className="text-lg text-amber-500 font-bold my-1 gap-1">
                            {boat["dnevnacijenanajma"] * dani} €
                        </div>
                    </div>
                    <button 
                    onClick={() => navigate(`/vessel/${boat.idplovila}`)}
                    className = "buttton fill-primary hover:cursor-pointer font-semibold rounded-md px-4 py-2 w-full md:w-auto mt-2">
                        Rezerviraj
                    </button>
                </div>
            </div>
        )
    }
    catch {
        cards = ""
    }

    return (<>
    <Header/>
        <div className = "flex flex-col items-center gap-4 min-h-screen bg-white font-sans text-black">
            <div className="w-3/4 mt-4">
                <Search search = {search} setSearch = {setSearch}/>
            </div>
            {cards}
        </div>
    </>)


}

export default Details;