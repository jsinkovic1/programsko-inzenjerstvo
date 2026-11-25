import {Component} from "react";
import "./CheckboxGroup.css"

class CheckboxGroup extends Component {
    state = { checked: []};

    handleChange = (e) => {
        var checked = this.state.checked
        
        if (!checked.includes(e.target.value) && e.target.checked)
            checked.push(e.target.value)
        if (checked.includes(e.target.value) && !e.target.checked)
            checked.splice(checked.indexOf(e.target.value), 1)
        
        const newState = {checked: checked}
        this.setState(newState);
        this.props.onChange(newState.checked)
    }

    render() {
        
        return (
            <div className={"checkbox-group"}>
                {
                    this.props.options.map(option => (            
                    <div className={"checkbox-row"}>
                        <input onChange={this.handleChange} type="checkbox" value={option}/>
                        <div className={"checkbox-label"}>{option}</div>
                    </div>
                    ))
            }
            </div>
        )
    }
}

export default CheckboxGroup