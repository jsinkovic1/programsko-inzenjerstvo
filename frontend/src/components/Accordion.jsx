import {Component} from "react";
import "./Accordion.css"
import {FaMinus, FaPlus} from "react-icons/fa6";

class Accordion extends Component {
    state = {
        collapsed: true,
    };

    handleClick = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <div className={this.state.collapsed ? "accordion-collapsed flex flex-col" : "accordion-expanded flex flex-col"}>
                <div onClick={this.handleClick} className={"accordion-header"}>
                    {this.state.collapsed ? <FaPlus className={"mr-1"} /> : <FaMinus className={"mr-1"}/>}
                    {this.props.header}
                </div>
                <div className={"accordion-content-wrapper"}>
                    {this.props.children}
                </div>
            </div>)
    }

}

export default Accordion