import {Component} from "react";
import "./RangeSlider.css"

class RangeSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valueLow: props.min,
            valueHigh: props.max,
        };
    }

    clamp(value) {
        const {min, max} = this.props;
        if (Number.isNaN(value)) return min;
        return Math.min(Math.max(value, min), max);
    }

    getLow() {
        return this.clamp(this.state.valueLow);
    }

    getHigh() {
        return this.clamp(this.state.valueHigh);
    }

    handleChangeLow = (e) => {
        const value = Number(e.target.value);
        const high = this.getHigh();
        this.setState({valueLow: value, valueHigh: Math.max(value, high)});
    }

    handleChangeHigh = (e) => {
        const value = Number(e.target.value);
        const low = this.getLow();
        this.setState({valueHigh: value, valueLow: Math.min(value, low)});
    }
    
    handleDragEnd = () => {
        const low = this.getLow();
        const high = this.getHigh();
        this.props.onChange?.(Math.min(low, high), Math.max(low, high));
    }

    render() {
        const {min, max} = this.props;
        const low = this.getLow();
        const high = this.getHigh();

        const from = Math.min(low, high);
        const to = Math.max(low, high);
        const span = max - min || 1;
        const percFilled = (to - from) / span;
        const translateX = ((from - min) / span) * 100;

        return (
            <div className="range-slider-container">
                <div className={"range-slider-track"} />
                <div className={"range-slider-fill"} style={{"transform": "translate(" + translateX + "%, 0px) scale(" + percFilled + ", 1)" }} />
                <input className={"range-slider -mb-4 " + (this.props.className ?? "")} type="range" min={min} max={max} value={low} onChange={this.handleChangeLow} onMouseUp={this.handleDragEnd} step={this.props.step}/>
                <input className={"range-slider -mb-4 " + (this.props.className ?? "")} type="range" min={min} max={max} value={high} onChange={this.handleChangeHigh} onMouseUp={this.handleDragEnd} step={this.props.step}/>
            </div>
        );
    }
}

export default RangeSlider
