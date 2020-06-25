import React, {Component} from "react";
import Box from "./Box";
import "./index.css"

// GRID is a  child component of Main
class Grid extends Component {
    render() {
        // The this.props we are referring bellow is used to reference any properties we want to inherit from the main component below
        const width = this.props.cols * 16 // the width of the grid passes as props to child component
        let rowsArr = [] // we initialize an empty array
        let boxClass = ""

        for (var i = 0; i < this.props.rows; i++) {
            for (var j = 0; j < this.props.cols; j++) {
                let boxId = i + "_" + j// here we creating an id to go with every box element
                boxClass = this.props.gridFull[i][j] ? "box on" : "box off" // Box on and Box off are style classes
                    rowsArr.push( // we pushing every box component to the row array
                    < Box
                        boxClass = { boxClass }
                        key = { boxId }
                        boxId = { boxId }
                        row = { i }
                        col = { j }
                        selectBox = { this.props.selectBox }
                        />
                    )
            }
        }
        return (
            <div className="grid" style={{ width: width }}> {/*for style purpose we set the div class to "grid"*/}
                {rowsArr} {/* the array of all the rows */}
            </div>
        )
    }
}
export default Grid;