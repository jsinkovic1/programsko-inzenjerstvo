import {Component} from "react";
import "./Slider.css"

class Slider extends Component {
    state = {
        value: 0,
    };

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <div className="slider-container">
                <input className={"slider " + this.props.className} type="range" min={this.props.min} max={this.props.max} value={this.state.value} onChange={this.handleChange} step={this.props.step}/>
            </div>

        );
    }
}

export default Slider