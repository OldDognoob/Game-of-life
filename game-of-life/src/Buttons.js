import React from "react";
import "./index.css"

class Buttons extends React.Component {
    // This is a method for change the grid size
    handleSelect = (evt) => {
        this.props.gridSize(evt.target.value)
    }
    render() {
        return (
            <div id="buttons"> {/*we set this id for styling purpose */}
                    <button onClick={this.props.playButton}>Play</button>
                    <button onClick={this.props.pauseButton}>Pause</button>
                    <button onClick={this.props.clear}>Clear</button>
                    <button onClick={this.props.slow}>Slow</button>
                    <button onClick={this.props.fast}>Fast</button>
                    <button onClick={this.props.seed}>Seed</button>
                    <button onClick={this.props.cross}>Cross</button>
                <select
                    title="Grid Size"
                    id="size-menu"
                    onChange={this.handleSelect}
                > {/*We wait for a chance in the drop menu then we send the value of the selected option to the handleSelect Method*/}
                    <option value="1">25 x 25</option>
                    <option value="2" selected>50 x 30</option>
                    <option value="3"> 70 x 50</option>
                </select>
                
            </div >
        )
    }
}
export default Buttons;