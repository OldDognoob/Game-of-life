import React, { Component } from "react";
import UniverseSystem from "./UniverseSystem";
import styled from "styled-components";

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Header = styled.h2`
  height: 35px;
  margin-bottom: 15px;
`;
const ButtonContainer = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;
const Button = styled.button`
  height: 30px;
  font-size: 25px;
  border-radius: 15px;
  border: 2px solid red;
`;

class Universe extends Component{
    constructor() {
        super();
        this.state = {
            generation: 0,
            clear: false,
            pause: false,
            rolling: false,
            gameOfLife: false,
            interval: null,
            randomize: false
        }
    }

    gameOfLife(running) {
        this.setState({gameOfLife:!this.state.gameOfLife});

        if (running === true) {
            let interval = setInterval(() => {this.setState({generation: this.state.generation +1})}, 1000);
            this.setState({interval})
        }
        if (running === false) {
            clearInterval(this.state.interval);
        }
    }

    rollSimulation = () => {
        this.setState({rolling: !this.state.rolling});
        if (this.state.rolling === false){
            this.gameOfLife(true);
            document.getElementById("playStopButton").innerHTML = "Stop";
        } else {
            this.gameOfLife(false);
            document.getElementById("playStopButton").innerHTML = "Play";
            this.setState({generation: 0});
        }
    }

    clearButton = () => {
        this.setState({clear: !this.state.clear});
    }

    pauseButton = () => {
        this.setState({pause: !this.state.pause});
    }
    randomButton = () => {
        this.setState({randomize: !this.state.randomize});
    }

    render() {
        return (
            <Container>
                <Header>
                    Generation: {this.state.generation}
                </Header>
                <UniverseSystem clear = {this.state.clear} randomize = {this.state.randomize} gameOfLife = {this.state.gameOfLife} clearButton={this.clearButton} pauseButton={this.pauseButton}
                stopButton = {this.stopButton} randomButton = {this.randomButton}/>
                <ButtonContainer>
                <Button id="playStopButton" onClick={this.rollSimulation}>Play</Button>
                <Button onClick = {this.pauseButton}>Pause</Button>
                <Button onClick = {this.randomButton}>Random</Button>
                <Button onClick = {this.clearButton}>Clear</Button>
            </ButtonContainer>
            </Container>
        );
    }
}
export default Universe;