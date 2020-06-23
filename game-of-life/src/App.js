import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import Universe from './logic/Universe';

const Title = styled.h1`
  width: 100%;
  size: 15px;
  height: 50px;
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
    border-radius: 15px;
    border: 2px solid black
`;
const AboutSection = styled.div`
  width: 100%;
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
        <AboutSection>
            <h2>About this Algorithm:</h2>
            <p style={{ color: "black", size: "2px solid black" }}>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two
              possible states, alive or dead. Every cell interacts with its eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent.</p>
            <p>If you would like to learn more about Conway's Game of Life, check out this <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">link!</a></p>
          </AboutSection>
          <Universe preset={this.state.preset}/>
          <PresetsContainer>
            <Button onClick={this.initialPreset} value='1'>Preset 1</Button>
            <Button onClick={this.initialPreset} value='2'>Preset 2</Button>
          </PresetsContainer>
          <Rules className="Rules">
            <h2>Rules:</h2>
            <ul>
              <li>If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.</li>
              <li>If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.</li>
            </ul>
          </Rules>
        </Content>
      </div>
    );
  }
}

export default App;
