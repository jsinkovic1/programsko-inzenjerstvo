import {Component} from "react";
import "./Accordion.css"

class Accordion extends Component {
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
            <div onClick={this.handleClick} className={this.state.collapsed ? "accordion-collapsed flex flex-col" : "accordion-expanded flex flex-col"}>
                <div className={"accordion-header"}>{this.props.header}</div>
                {this.props.children}
            </div>)
    }

}

export default Accordion