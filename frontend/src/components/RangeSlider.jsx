import {Component} from "react";
import "./RangeSlider.css"

class RangeSlider extends Component {
    state = {
        valueLow: 0.0,
        valueHigh: 0.0,
    };

    handleChangeLow = (e) => {
        this.setState({valueLow: e.target.value, valueHigh: this.state.valueHigh});
    }
    handleChangeHigh = (e) => {
        this.setState({valueLow: this.state.valueLow, valueHigh: e.target.value});
    }

    render() {
        const percFilled = (this.state.valueHigh - this.state.valueLow) / (this.props.max - this.props.min)
        const translateX = (this.state.valueLow / this.props.max) * 100

        return (
            <div className="range-slider-container">
                <div className={"range-slider-track"} />
                <div className={"range-slider-fill"} style={{"transform": "translate(" + translateX + "%, 0px) scale(" + percFilled + ", 1)" }} />
                <input className={"range-slider -mb-4 " + this.props.className} type="range" min={this.props.min} max={this.props.max} value={this.state.valueLow} onChange={this.handleChangeLow} step={this.props.step}/>
                <input className={"range-slider -mb-4 " + this.props.className} type="range" min={this.props.min} max={this.props.max} value={this.state.valueHigh} onChange={this.handleChangeHigh} step={this.props.step}/>
            </div>

        );
    }
}

export default RangeSlider