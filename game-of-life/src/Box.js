import React, {Component} from "react";

// STRUCTURE OF APP - {MAIN: {GRID: {BOX}}}
// BOX is a childe component of Grid 
// Which is a child component of Main
class Box extends Component {
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col) // calling the function from the props
    }
    render() {
        return (
            <div
                className={this.props.boxClass}
                id={this.props.id}
                onClick={this.selectBox}// at this point we are not passing selectBox as props , because has already a function in the Box component
            />
        )
    }
}
export default Box;