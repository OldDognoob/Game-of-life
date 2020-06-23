import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
// STRUCTURE OF APP - {MAIN: {GRID: {BOX}}}
// BOX is a childe component of Grid 
// Which is a child component of Main
class Box extends React.Component {
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col)
    }
    render() {
        return (
            <div
                className={this.props.boxClass}
                id={this.props.id}
                onClick={this.selectBox}
            />
        )
    }
}
// GRID is a  child component of Main
class Grid extends React.Component {
    render() {
        // The this,props we are referring bellow is used to reference any properties we want to inherit from the main component below
        const width = this.props.cols * 16
        let rowsArr = []
        let boxClass = ""

        for (var i = 0; i < this.props.rows; i++) {
            for (var j = 0; j < this.props.cols; j++) {
                let boxId = i + "_" + j
                boxClass = this.props.gridFull[i][j] ? "box on" : "box off" // Box on and Box off are style classes
                    rowsArr.push(
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
                {rowsArr}
            </div>
        )
    }
}
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
                <select
                    title="Grid Size"
                    id="size-menu"
                    onChange={this.handleSelect}
                > {/*We wait for a chance in the drop menu then we send the value of the selected option to the handleSelect Method*/}
                    <option value="1">20 x 10</option>
                    <option value="2" selected>50 x 30</option>
                    <option value="3"> 70 x 50</option>
                </select>
                
            </div >
        )
    }
}
class Main extends React.Component {
    constructor(props) {
        super(props)
        this.speed = 100
        this.rows = 30
        this.cols = 50
        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }
    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull) // arrayClone is a helper function defined below
        gridCopy[row][col] = !gridCopy[row][col]
        this.setState({ gridFull: gridCopy })
    }
    seed = () => {
        let gridCopy = arrayClone(this.state.gridFull)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true
                }
            }
        }
        this.setState({ gridFull: gridCopy }) //we update the grid with a random seed
    }
    playButton = () => {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.play, this.speed) // Every 100ms (this.speed) we will run this.play to update the game state
    }
    pauseButton = () => {
        clearInterval(this.intervalId)
    }
    slow = () => {
        this.speed = 1000
        this.playButton() // clears interval and sets new interval with new speed
    }
    fast = () => {
        this.speed = 100
        this.playButton() // clears interval and sets new interval with new speed
    }
    clear = () => {
        let blankGrid = Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        this.setState({
            gridFull: blankGrid,
            generation: 0
        })
    }
    gridSize = (size) => {
        switch (size) {
            case "1":
                this.cols = 25
                this.rows = 25
                break;
            case "2":
                this.cols = 50
                this.rows = 30
                break;
            default:
                this.cols = 70
                this.rows = 50
        }
        this.clear() // reset the grid after resizing it so it doesn't still contain the old grid elements
    }
    play = () => {
        let g = this.state.gridFull // we check to see how the grid is looking at
        let g2 = arrayClone(this.state.gridFull) // we create a copy fo the grit to update a new grid
            
        // The Game Logic determines which cell born or dies
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let count = 0;
                if (i > 0) if (g[i - 1][j]) count++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
                if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
                if (j < this.cols - 1) if (g[i][j + 1]) count++;
                if (j > 0) if (g[i][j - 1]) count++;
                if (i < this.rows - 1) if (g[i + 1][j]) count++;
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
                if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
                if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false; // DIES
                if (!g[i][j] && count === 3) g2[i][j] = true; // REBORN
                }
        }
        
            this.setState({
                gridFull: g2,
                generation: this.state.generation + 1
            });
        }
    // LIFECYCLE HOOK - Method that runs when everything loads
    componentDidMount() {
        this.seed()
        this.playButton()
    }
    render() {
        return (
            <div>
                <h1>The Game of Life</h1>
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    slow={this.slow}
                    fast={this.fast}
                    clear={this.clear}
                    seed={this.seed}
                    gridSize={this.gridSize}
                    />
                <Grid 
                    gridFull={this.state.gridFull} // THESE ARE REACT PROPERTIES BEING SENT ANYWHERE THE GRID COMPONENT IS CALLED
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
                <h2>Generations: {this.state.generation}</h2>
                <h3>About:</h3>
                <div id="rulesbox">
                <p id="rules">
                        The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician <strong><a href="https://en.wikipedia.org/wiki/John_Horton_Conway">John Horton Conway</a></strong> in 1970.
                </p>
                <p id="rules">
                        The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.<br /><br />
                        <strong><em>Adjust the grid size and click "Seed" to randomize the game or pause and click any square to draw your own organisms.</em></strong>
                </p>
                <p id="rules">
                One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced players, by creating patterns with particular properties.
                </p>
                </div>
                <h3>The Rules:</h3>
                <div id="rulesbox">
                <p id="rules">
                    <strong><u>For a space that is 'populated':</u></strong><br />
                    Each cell with one or no neighbors dies, as if by solitude.<br />
                    Each cell with four or more neighbors dies, as if by overpopulation.<br />
                    Each cell with two or three neighbors survives.<br />
                </p>
                <p id="rules">
                    <strong><u>For a space that is 'empty' or 'unpopulated'</u></strong><br />
                    Each cell with three neighbors becomes populated.<br />
                    </p>
                </div>
                <p id="footer">
                    Conway's The Game of Life
                </p>
            </div>
        )
    }
}
// HELPER FUNCTION FOR DEEP CLONING ARRAYS
function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr))
}
ReactDOM.render(<Main />, document.getElementById("root"))
