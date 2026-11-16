import "../App.css"
import {useNavigate} from "react-router-dom";
import Accordion from "../components/Accordion.jsx";
import Slider from "../components/Slider.jsx";
import RangeSlider from "../components/RangeSlider.jsx";
import {CardMedium, CardSmall} from "../components/Cards.jsx";
import {useEffect, useState} from "react";
import Vessel from "../models/Vessel.js";
import {MdInsertEmoticon} from "react-icons/md";


function Gallery() {
    var nav = useNavigate()
    const [vessel, SetVessel] = useState(null)


    useEffect(() => {Vessel.GetById(1).then(x => SetVessel(x))}, [])

    return (
        <div className={"grid grid-cols-5 p-10 gap-2"}>
            <div className={"flex flex-col gap-2"}>
                {/* Obican gumb */}
                <button onClick={() => nav("/map")} className={"button"}>
                    Button
                </button>

                {/* Gumb ispunjen primarnom (tamnoplavom) bojom */}
                <button onClick={() => nav("/map")} className={"button fill-primary"}>
                    Button (primary fill)
                </button>

                {/* Gumb ispunjen akcentnom (narančasto-žuto) */}
                <button onClick={() => nav("/map")} className={"button fill-accent"}>
                    Button (accent fill)
                </button>

                {/* Accordion element, koristan za filtere */}
                <Accordion header={"Accordion"}>
                    <button onClick={() => nav("/map")} className={"button fill-primary"}>
                        Lorem ipsum
                    </button>
                    <button onClick={() => nav("/map")} className={"button fill-primary"}>
                        Lorem ipsum
                    </button>
                </Accordion>

                {/* Text input */}
                <input type="text" placeholder={"Text input"} className="text-input"/>

                {/* Slideri */}
                <Slider min={0} max={100} step={1}/>
                <RangeSlider min={0} max={100} step={1}/>

                {/* Gumbi s ikonom */}
                <div className={"flex flex-row gap-2 h-10"}>
                    <button onClick={() => nav("/map")} className={"icon-button w-10"}>
                        <MdInsertEmoticon id={"icon"} />
                    </button>

                    {/* Ovaj gumb ima dropdown */}
                    <button className={"icon-button fill-primary dropdown"}>
                        <MdInsertEmoticon id={"icon"} />
                        <div className={"dropdown-content"}>
                            <a href={"/details  "}>
                                Option 1
                            </a>
                            <a href={"/"}>
                                Option 2
                            </a>
                            <a href={"/map"}>
                                Option 3
                            </a>
                        </div>
                    </button>

                    <button onClick={() => nav("/map")} className={"icon-button fill-accent"}>
                        <MdInsertEmoticon id={"icon"} />
                    </button>
                </div>

            </div>
            <div className={"flex flex-col gap-2"}>
                <CardSmall vessel={vessel}/>
                <CardMedium/>
            </div>
        </div>
    )
}

export default Gallery;