import '../App.css'
import Header from "../components/Header.jsx";
import {useEffect, useState} from "react";
import placeholder from "../assets/placeholder.svg";
import { useNavigate } from 'react-router-dom';
import Search from "./Search"
import DropdownDiv from "../components/DropdownDiv.jsx";
import RangeSlider from "../components/RangeSlider.jsx";
import Footer from '../components/Footer.jsx';

function Details()
{
    const [boats, setBoats] = useState([])
    const navigate=useNavigate()

    const[search, setSearch] = useState("")
    const [priceLower, setPriceLower] = useState("0")
    const [priceHigher, setPriceHigher] = useState("")
    const [maxPrice, setMaxPrice] = useState(0)

    const fetchAll = () => {
        fetch("/api/plovilo")
        .then(response => response.json())
        .then(data => {
            setBoats(data)
            const highest = Math.max(0, ...data.map(boat => boat.dnevnacijenanajma))
            const roundedMax = Math.ceil(highest / 100) * 100
            setMaxPrice(roundedMax)
            setPriceHigher(current => current === "" ? String(roundedMax) : current)
        })
    };

    useEffect(() => {
        fetchAll();
    }, [])

    // Nazivi luka dohvaćaju se jednom i spremaju kao { idluke: nazivluke },
    // pa se uz svako plovilo ispisuje naziv luke prema njegovom idluke
    const [harborNames, setHarborNames] = useState({})

    useEffect(() => {
        fetch("/api/luka")
        .then(response => response.ok ? response.json() : [])
        .then(data => setHarborNames(Object.fromEntries(data.map(h => [h.idluke, h.nazivluke]))))
        .catch(() => setHarborNames({}))
    }, [])
    
    const handlePriceFilter = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/Filter", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priceLower: priceLower !== "" && Number(priceLower) > 0 ? Number(priceLower) : null,
                    priceHigher: priceHigher !== "" && Number(priceHigher) < maxPrice ? Number(priceHigher) : null
                })
            })
            
            if (response.ok) {
                const data = await response.json();
                setBoats(data)
            }
        }
        catch(error) {
            console.error("Greška: ", error);
        }
    }

    const handleReset = () => {
        setPriceLower("0");
        setPriceHigher(String(maxPrice));
        fetchAll();
    };

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
                            {harborNames[boat.idluke] ?? ""}
                        </h1>
                        <div className="text-lg text-amber-500 font-bold my-1 gap-1">
                            {boat["dnevnacijenanajma"]} €
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
    <title>Plovila | Charterly</title>
        <div className = "flex flex-col items-center gap-4 min-h-screen bg-white font-sans text-black">
            <div className="w-3/4 mt-4 flex flex-row gap-4">
                <Search search = {search} setSearch = {setSearch}/>
                <div className="relative">
                    
                </div>
                <DropdownDiv header={"Cijena"}>
                    <form onSubmit={handlePriceFilter}>
                         <div className = "flex flex-row">
                            <div className = "flex flex-col text-sm text-gray-700 gap-2 font-semibold">
                                <label>Najniža cijena</label>
                                <input
                                type="number"
                                name="priceLower"
                                min={0}
                                value={priceLower}
                                onChange={(e) => setPriceLower(e.target.value)}
                                className="bg-white rounded-md py-2 px-3 w-36 mr-2 mt-2"
                                />
                            </div>
                            <div className = "flex flex-col text-sm text-gray-700 gap-2 font-semibold">
                                <label>Najviša cijena</label>
                                <input name="priceHigher"
                                type ="number"
                                min={0}
                                value={priceHigher}
                                onChange={(e) => setPriceHigher(e.target.value)}
                                className="bg-white rounded-md py-2 px-3 w-36 mr-2 mt-2"/>
                            </div>
                        </div>
                        {/* Klizač i polja prikazuju istu vrijednost; ako korisnik isprazni polje, ručica stoji na rubu */}
                        <RangeSlider
                            min={0}
                            max={maxPrice}
                            step={10}
                            valueLow={priceLower === "" ? 0 : Number(priceLower)}
                            valueHigh={priceHigher === "" ? maxPrice : Number(priceHigher)}
                            onChange={(low, high) => {
                                setPriceLower(String(low))
                                setPriceHigher(String(high))
                            }}
                        />
                        <div className = "flex flex-row justify-evenly">
                            <button type="submit" className="button fill-primary">
                                Pretraži
                            </button>
                            <button type = "button" onClick={handleReset} className="button">
                                Poništi
                            </button>
                        </div>
                    </form>
                </DropdownDiv>
            </div>
            {cards}
        </div>
        <Footer/>
    </>)


}

export default Details;