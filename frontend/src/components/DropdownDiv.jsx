import {Component} from "react";
import "./DropdownDiv.css"
import {FaMinus, FaPlus} from "react-icons/fa6";

class DropdownDiv extends Component {
    state = {
        collapsed: true,
    };

    handleClick = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });

        console.log(this.props)
    }

    render() {
        return (
            <div className={this.state.collapsed ? "dropdown-div-collapsed flex flex-col" : "dropdown-div-expanded flex flex-col"}>
                <div onClick={this.handleClick} className={"dropdown-div-header"}>
                    {this.state.collapsed ? <FaPlus className={"mr-1"} /> : <FaMinus className={"mr-1"}/>}
                    {this.props.header}
                </div>
                <div className={"dropdown-div-content-wrapper"}>
                    {this.props.children}
                </div>
            </div>)
    }

}

export default DropdownDiv