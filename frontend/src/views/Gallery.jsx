import "../App.css"
import {useNavigate} from "react-router-dom";
import Accordion from "../components/Accordion.jsx";
import Slider from "../components/Slider.jsx";
import RangeSlider from "../components/RangeSlider.jsx";
import {CardMedium, CardSmall} from "../components/Cards.jsx";


function Gallery() {
    var nav = useNavigate()
    return (
        <div className={"grid grid-cols-5 p-10 gap-2"}>
            <div className={"flex flex-col gap-2"}>
                <button onClick={() => nav("/map")} className={"button"}>
                    Button
                </button>
                <button onClick={() => nav("/map")} className={"button fill-primary"}>
                    Button (primary fill)
                </button>
                <button onClick={() => nav("/map")} className={"button fill-accent"}>
                    Button (accent fill)
                </button>
                <Accordion header={"Accordion"}>
                    <button onClick={() => nav("/map")} className={"button fill-primary"}>
                        Lorem ipsum
                    </button>
                    <button onClick={() => nav("/map")} className={"button fill-primary"}>
                        Lorem ipsum
                    </button>
                </Accordion>
                <input type="text" placeholder={"Text input"} className="text-input"/>
                <Slider min={0} max={100} step={1}/>
                <RangeSlider min={0} max={100} step={1}/>
            </div>
            <div className={"flex flex-col gap-2"}>
                <CardSmall/>
                <CardMedium/>
            </div>
        </div>
    )
}

export default Gallery;