<<<<<<< HEAD
﻿﻿import {Component, use, useEffect, useState} from "react";
=======
﻿import {Component, use, useEffect, useState} from "react";
>>>>>>> origin/main
import {FaUserCircle} from "react-icons/fa";
import {data} from "react-router-dom";

function Logo() {
  return (
    <svg className="size-[60px] fill-none" viewBox="0 0 100 100" role="img" aria-label="Charter logo">
    <path d="M85.5 44C85.5 66.9198 66.9198 85.5 44 85.5C21.0802 85.5 2.5 66.9198 2.5 44C2.5 21.0802 21.0802 2.5 44 2.5C66.9198 2.5 85.5 21.0802 85.5 44Z" strokeWidth="5" stroke="#98D3DF"/>
    <path d="M47.5828 2.37915V63.6418H7.28435L47.5828 2.37915Z" fill="#98D3DF"/>
    <path d="M61.8574 27.3601V58.8836H83.8643L61.8574 27.3601Z" fill="#98D3DF"/>
    <path d="M61.8574 7.13745V58.8835H26.7652L61.8574 7.13745Z" fill="#EFEFEF"/>
    <path d="M11.3009 69.5895H55.9096V83.8643L11.3009 69.5895Z" fill="#EFEFEF"/>
    <path d="M76.7269 69.5895H55.9096V83.8643L76.7269 69.5895Z" fill="#EFEFEF"/>

    </svg>
  );
}

const Header = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetch("api/auth/me").then(res => res.json()).then(data => setUserData(data))
    }, []);
<<<<<<< HEAD

    const handleLogout = async () =>{
        const response = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            credentials: "include"
        })
        if(response.ok) setUserData("");
    }
    
    var dropdown_elements = (
            <a href="/login">
                Prijava
            </a>
            
    )
    if (userData != "")
    {
        dropdown_elements = (
            <><a href={"/profile"}>
                {userData["mail"]}
            </a>
            <button onClick={handleLogout} className="cursor-pointer">
                Odjava
            </button></>
        )
    }

    

=======
    
    var dropdown_elements = (
        <a href={"/login"}>
            Prijava
        </a>
    )
    if (userData != null)
    {
        dropdown_elements = (
            <a href={"/profile"}>
                {userData["mail"]}
            </a>
        )
    }

>>>>>>> origin/main

    return(
        <header className="relative flex h-16 items-center justify-between bg-blue-900 px-2.5 shadow-md">
            <a href="/" className="flex" aria-label="Charter home">
                <Logo />
            </a>

            <h1 className="absolute left-1/2 -translate-x-1/2 font-title text-2xl font-medium text-white">
                Charterly
            </h1>

<<<<<<< HEAD
            <div className={"icon-button fill-primary dropdown h-10 z-9999 flex flex-row items-center justify-center aspect-square font-sans text-base bg-gray-100 hover:bg-gray-200 focus:bg-gray-400 rounded-full shadow-md p-2"}>
=======
            <button className={"button icon-button fill-primary dropdown h-10 z-9999"}>
>>>>>>> origin/main
                <FaUserCircle></FaUserCircle>
                <div className={"dropdown-content right-0"}>
                    {dropdown_elements}
                </div>
<<<<<<< HEAD
            </div>
=======
            </button>
>>>>>>> origin/main
        </header>)
        
}

export default Header;