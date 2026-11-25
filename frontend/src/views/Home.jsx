import "../App.css";
import Header from "../components/Header.jsx";
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import Footer from "../components/Footer.jsx";
import BoatCard from '../components/BoatCard.jsx';

export default function Home() {
  const navigate=useNavigate();

  const [boats, setBoats] = useState([])

  useEffect(() => {
  fetch("/api/plovilo")
    .then(response => {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(data => setBoats(data))
    .catch(err => console.error("Greška kod dohvata plovila:", err));
}, []);
  const [harborNames, setHarborNames] = useState({})

    useEffect(() => {
        fetch("/api/luka")
        .then(response => response.ok ? response.json() : [])
        .then(data => setHarborNames(Object.fromEntries(data.map(h => [h.idluke, h.nazivluke]))))
        .catch(() => setHarborNames({}))
    }, [])

    const popular = boats.slice(0, 3);
    const boatCount = boats.length > 0 ? boats.length : 999;

  return (
    <>
    <div className="min-h-screen bg-white font-sans text-black">
        <Header/>
        <title>Charterly - najam plovila</title>
      <main>
        <section className="flex h-[528px] flex-col items-center justify-center gap-[62px] px-4 text-center max-md:h-auto max-md:gap-10 max-md:py-20">
          <h2 className="text-navy font-semibold text-[clamp(28px,4vw,52px)] font-normal tracking-[0.01em]">
            Unajmite jedno od <span className="text-aqua">{boatCount}</span> plovila danas!
          </h2>
          <div className="flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <button
              onClick={() => navigate("/map")}
              className="fill-primary cursor-pointer rounded-lg px-8 py-3 text-lg font-semibold shadow-md transition-shadow hover:shadow-lg"
            >
              Otvori kartu
            </button>
            <button
              onClick={() => navigate("/details")}
              className="cursor-pointer rounded-lg border-2 border-blue-900 bg-white px-8 py-3 text-lg font-semibold text-blue-900 transition-colors hover:bg-blue-50"
            >
              Pregledaj plovila
            </button>
          </div>
        </section>
        <section
          aria-label="Plovila"
          className="mx-auto max-w-[1200px] grid grid-cols-1 gap-6 px-4 mb-16"
        >
        {popular && popular.length > 0 ? (
          popular.map(boat => (
            <div key={boat.idplovila} className="w-full flex justify-center">
              <BoatCard 
              boat={boat} 
              harborName={harborNames[boat.idluke]} 
              />
            </div>
          ))
        ) : (
        <p className="col-span-3 text-center text-gray-500">Učitavanje popularnih plovila...</p>
        )}
        </section>
      </main>   
    </div>
      <Footer/>
    </>
  );
}
