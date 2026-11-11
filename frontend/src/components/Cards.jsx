import {FaBed, FaClock, FaDoorClosed, FaPeopleGroup, FaShip} from "react-icons/fa6";
import "./Cards.css"
import {Component} from "react";

class CardSmall extends Component {

    render()
    {
        return (
            <div className={"card-small"}>
                <img alt={"vessel image"} className={"card-image"} src={"https://picsum.photos/200/400"}/>
                <div className={"card-content-wrapper"}>
                    <p className={"card-header"}>
                        Ime broda
                    </p>
                    <div className={"card-description"}>
                        <div className={"flex flex-row items-center"}>
                            <FaPeopleGroup className={"mt-0.5"}/>
                            <span className={"pl-1"}>123</span>
                        </div>
                        <div className={"flex flex-row items-center"}>
                            <FaDoorClosed className={"mt-0.5"}/>
                            <span className={"pl-1"}>123</span>
                        </div>
                        <div className={"flex flex-row items-center"}>
                            <FaBed className={"mt-0.5"}/>
                            <span className={"pl-1"}>123</span>
                        </div>
                        <div className={"flex flex-row items-center"}>
                            <FaShip className={"mt-0.5 shrink-0"}/>
                            <div className={"pl-1 text-nowrap overflow-scroll"}>Model</div>
                        </div>
                        <div className={"flex flex-row items-center"}>
                            <FaClock className={"mt-0.5"}/>
                            <span className={"pl-1 overflow-hidden"}>2014</span>
                        </div>
                    </div>
                </div>
            </div>)
    }

}

class CardMedium extends Component {

    render()
    {
        return (
            <div className={"card-medium"}>
                <img alt={"vessel image"} className={"card-image"} src={"https://picsum.photos/200/400"}/>
                <div className={"card-content-wrapper"}>
                    <p className={"card-header"}>
                        Ime broda
                    </p>
                    <div className={"card-description"}>
                        <div className={"flex flex-row items-center"}>
                            <FaPeopleGroup className={"mt-0.5"}/>
                            <span className={"pl-1"}>123</span>
                        </div>
                        <div className={"flex flex-row items-center"}>
                            <FaDoorClosed className={"mt-0.5"}/>
                            <span className={"pl-1"}>123</span>
                        </div>
                        <div className={"flex flex-row items-center"}>
                            <FaBed className={"mt-0.5"}/>
                            <span className={"pl-1"}>123</span>
                        </div>
                        <div className={"flex flex-row items-center"}>
                            <FaShip className={"mt-0.5 shrink-0"}/>
                            <div className={"pl-1 text-nowrap overflow-scroll"}>Model</div>
                        </div>
                        <div className={"flex flex-row items-center"}>
                            <FaClock className={"mt-0.5"}/>
                            <span className={"pl-1 overflow-hidden"}>2014</span>
                        </div>
                    </div>
                </div>
            </div>)
    }

}

export {CardSmall, CardMedium}