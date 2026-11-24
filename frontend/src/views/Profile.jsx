import Header from "../components/Header.jsx";
import "../App.css"
import {useEffect, useState} from "react";

export default function Profile() {
    const [userData, setUserData] = useState([]);
    
    useEffect(() => {
        fetch("api/auth/me").then(res => res.json()).then(data => setUserData(data))
    }, []);
    
    return (
        <div className={"h-full flex flex-col"}>
            <Header/>
            <div className="bg-gray-100 grow flex flex-col items-center justify-center p-10">
                <div className="bg-white w-full h-full rounded-lg shadow-md flex flex-col items-stretch p-4 gap-2">
                    <div className={"text-xl font-title text-gray-800"}>
                        {userData["mail"]}
                    </div>
                    <div className={"text-md font-title text-gray-600"}>
                        {userData["uloga"]}
                    </div>
                </div>
            </div>

        </div>
    );
}