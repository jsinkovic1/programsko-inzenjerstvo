import '../App.css'
import Header from "../components/Header.jsx";
import {useEffect, useState} from "react";

import { useNavigate } from 'react-router-dom';
import Search from "./Search"
import DropdownDiv from "../components/DropdownDiv.jsx";
import RangeSlider from "../components/RangeSlider.jsx";
import CheckboxGroup from '../components/CheckboxGroup.jsx';
import Footer from '../components/Footer.jsx';
import BoatCard from '../components/BoatCard.jsx';

function Details()
{
    const [boats, setBoats] = useState([])
    const navigate=useNavigate()

    const[search, setSearch] = useState("")
    const [priceLower, setPriceLower] = useState("0")
    const [priceHigher, setPriceHigher] = useState("")
    const [maxPrice, setMaxPrice] = useState(0)
    const [vesselTypes, setVesselTypes] = useState([])
    const [selectedTypes, setSelectedTypes] = useState([])
    const [selectedHarbors, setSelectedHarbors] = useState([]) 
    const [resetKey, setResetKey] = useState(0)

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

    useEffect(() => {
        fetch("/api/plovilo/tipplovila")
        .then(response => response.ok ? response.json() : [])
        .then(data => setVesselTypes(data.map(x => x["nazivtipaplovila"])))
        .catch(() => setVesselTypes([]))
    }, [])

    
    const handleFilter = async(e) => {
        e.preventDefault();

        try {
            const harborIds = Object.entries(harborNames)
                .filter(([id, name]) => selectedHarbors.includes(name))
                .map(([id]) => Number(id))
            const response = await fetch("/api/Filter", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priceLower: priceLower !== "" && Number(priceLower) > 0 ? Number(priceLower) : null,
                    VesselTypes: selectedTypes.length > 0 ? selectedTypes : null,
                    HarborIds: harborIds.length > 0 ? harborIds : null
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
        setSelectedTypes([]);
        setSelectedHarbors([]);
        setResetKey(k => k + 1);
        fetchAll();
    };

    return (<>
    <Header/>
    <title>Plovila | Charterly</title>
        <div className = "flex flex-col items-center gap-4 min-h-screen bg-white font-sans text-black">
            <div className="w-3/4 mt-4 flex flex-row gap-4">
                <Search search = {search} setSearch = {setSearch}/>
                <div className="relative">
                    
                </div>
                <DropdownDiv header={"Cijena"}>
                    <form onSubmit={handleFilter}>
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
                <DropdownDiv header={"Vrsta plovila"}>
                    <form onSubmit={handleFilter}>
                        <CheckboxGroup
                            key={"types-" + resetKey}
                            options={vesselTypes}
                            onChange={setSelectedTypes}
                        />
                        <div className="flex flex-row justify-evenly">
                            <button type="submit" className="button fill-primary">Pretraži</button>
                            <button type="button" onClick={handleReset} className="button">Poništi</button>
                        </div>
                    </form>
                </DropdownDiv>
                <DropdownDiv header={"Luka"}>
                    <form onSubmit={handleFilter}>
                        <CheckboxGroup
                            key={"harbors-" + resetKey}
                            options={Object.values(harborNames)}
                            onChange={setSelectedHarbors}
                        />
                        <div className="flex flex-row justify-evenly">
                            <button type="submit" className="button fill-primary">Pretraži</button>
                            <button type="button" onClick={handleReset} className="button">Poništi</button>
                        </div>
                    </form>
                </DropdownDiv>
            </div>
            {boats && boats.map(boat => (
                <BoatCard 
                    key={boat.idplovila} 
                    boat={boat} 
                    harborName={harborNames[boat.idluke]} 
                />
            ))}
        </div>
        <Footer/>
    </>)


}

export default Details;