import React from "react"
import '../App.css'

//https://medium.com/@nicholasfagner/filtering-data-with-react-js-350b3ca696fa

function Search({search,setSearch}) {
    function handleChange(event) {
        setSearch(event.target.value)
    }
    return (
    <input 
    type="text" 
    name="ploviloIme" 
    placeholder={"Pretražite plovila: "} 
    value={search}
    onChange={handleChange}
    className="text-input"/>
    )
}

export default Search