import React, { Component } from 'react';
import './App.css';

import styled from 'styled-components';
import Game from './Components/Game';

const Title = styled.h1`
  width: 90%;
  size: 15px;
  height: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1000px;
`;

const PresetsContainer = styled.div`
  width: 300px;
  border: 3px solid red;
`;

const Rules = styled.div`
  width: 300px;
  font-weight: bold;
  border: 3px solid yellow;
`;



const Button = styled.button`
    height: 25px;
    font-size: 20px;
    border-radius: 20px;
    border: 2px solid black
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      preset: null
    }
  }

  initialPreset = event => {
    this.setState({preset: event.target.value});
  }

  render() {


    return (
      <div className="App">
        <Content>
        <Title>Conway's Game of Life</Title>
          <Game preset={this.state.preset}/>
          <PresetsContainer>
            <Button onClick={this.initialPreset} value='1'>Preset 1</Button>
            <Button onClick={this.initialPreset} value='2'>Preset 2</Button>
            <Button onClick={this.initialPreset} value='3'>Preset 3</Button>
            <Button onClick={this.initialPreset} value='4'>Preset 4</Button>
          </PresetsContainer>
          <Rules className="Rules">
            <h2>Rules:</h2>
            <ul>
               If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
              If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
            </ul>
            <h2>About this Algorithm:</h2>
          </Rules>
        </Content>
      </div>
    );
  }
}

export default App;
