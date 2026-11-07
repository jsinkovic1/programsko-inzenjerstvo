import "../App.css"
import {useNavigate} from "react-router-dom";
import Accordion from "../components/Accordion.jsx";

function Gallery() {
    var nav = useNavigate()
    return (
        <div className={"grid grid-cols-5 p-10 gap-2"}>
            <div className={"flex flex-col gap-2"}>
                <button onClick={() => nav("/map")} className={"button"}>
                    Button
                </button>

                <button onClick={() => nav("/map")} className={"button primary"}>
                    Button (primary)
                </button>
                <Accordion header={"Accordion"}>
                    <button onClick={() => nav("/map")} className={"button primary"}>
                        Lorem ipsum
                    </button>
                    <button onClick={() => nav("/map")} className={"button primary"}>
                        Lorem ipsum
                    </button>
                </Accordion>
                <input type="text" placeholder={"Placeholder"} className="text-input"/>
            </div>

        </div>
    )
}

export default Gallery;