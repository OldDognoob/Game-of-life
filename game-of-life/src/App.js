import React, {Component} from "react";
import Grid from "./Grid";
import Buttons from "./Buttons";
import "./index.css"

class Main extends Component {
    constructor(props) {
        super(props)
        // the above elements define the variables to start
        this.speed = 100
        this.rows = 30
        this.cols = 50
        this.state = {
            generation: 0,
            // two things here: 1. we create a big array to filled up with the rows and an arry to fill the colum
            // ...............: 2. to begin we set of the cell of the grid
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    } // Point of remembering: every cells in order to start needs to be off(false-unselected). 
      // In order to be true(clicked and revealed) we need to create a method
    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull) // arrayClone is a helper function defined below. Here we are not updating the starting point but we create a array copy
        gridCopy[row][col] = !gridCopy[row][col] //the first part says the square of the grid with the exact row and colum set it to true/false
        this.setState({ gridFull: gridCopy }) // we updating by using the set state
    }
    seed = () => {
        let gridCopy = arrayClone(this.state.gridFull)// we copy our grid
        // looping through every square of our grid to decide which one will be turn on or off
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (Math.floor(Math.random() * 4) === 1) {// randomly we are setting whether a square of the grid turns on or not
                    gridCopy[i][j] = true
                }
            }
        }
        this.setState({ gridFull: gridCopy }) //we update the grid with a random seed
    }
    cross = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        let len = gridCopy.length;
        len = len % 2 === 0 ? len : len - 1;
        for (let i = 0; i < this.rows; i++){
            gridCopy[i][len / 2] = 1;
            for (let j = 0; j < this.cols; j++){
            gridCopy[len / 2 - 1][j] = 1;
            }
        }
        this.setState({
            gridFull: gridCopy
        });
        };
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
                    cross={this.cross}
                    gridSize={this.gridSize}
                    />
                <Grid // These are react properties being sent anywhere the grid component is called
                      // we passing the whole grid , with the rows the colum as props
                    gridFull={this.state.gridFull} 
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
                    <strong><u>A simple explanation of Conway's Game of Life</u></strong><br />
                    Every cell interacts with eight live neighbors, positioned horizontally, vertically or diagonally adjacent.
                    The following transition occurs by the four rules:<br />
                    Any live cell with less than two live neighbors dies, as under population.
                    Any live cell with two or three live neighbors lives on to the next generation.
                    Any live cell with more than three live neighbors dies, as if by overpopulation.
                    Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                    The above rules can compare the behavior of the automaton in real life as:<br />
                    Everything is depends of weather the cell is alive or dead.<br />
                    - if the cell is alive and it has exactly 2 or 3 live neighbors around then it remains alive<br />
                    - if the cell is dead and it has exactly 3 live neighbors then it reborn<br />
                    - Any other circumstances the cell is dead <br />
                </p>
                </div>
                <p id="footer">
                    Conway's The Game of Life
                </p>
            </div>
        )
    }
}
// Helper function for Cloning Arrays
function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr))
}
export default Main;
