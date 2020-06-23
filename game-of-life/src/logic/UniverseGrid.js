import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 22px;
    height: 22px;
    border: 2px solid black;
    background-color: ${props => props.status ? "red": "grey"};
`;
class UniverseGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Container status={this.props.status} id='cell' onClick={() => this.props.toggleCell(this.props.id)}>
            </Container>
        )
    }
}
export default UniverseGrid;