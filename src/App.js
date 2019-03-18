import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import Tile from './Tile';

const MainWrapper = styled.div`
  width: 100%;
  color: #52565e;
`;

const Content = styled.div`
  width: 600px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0;
`;

const Button = styled.button`
  width: 160px;
  height: 35px;
  border: 2px solid #12418c;
  background-color: transparent;
  color: #12418c;
  font-weight: bold;
  font-size: 1.2em;
  border-radius: 5px;
  &:enabled:hover {
    background-color: #7ea2d6;
  };
  &:enabled:active {
    backgound-color: #6891f2;
  };
  &:disabled {
    color: #6f6f70;
    border: 2px solid #6f6f70;
  };
  margin: 5px 10px;
`;

const Message = styled.p`
  width: 600px;
  margin: 2em auto;
  font-size: 2em;
  text-align: center;
`;

const Icon = styled.span`
  width: 60px;
  height: 60px;
  font-weight: bold;
  font-size: 1.1em;
  color: ${props => props.color ? props.color : 'black'};
`;

const TextInput = styled.input`
  width: 120px;
  font-size: 1em;
  height: 25px;
  border-radius: 3px;
  border: 2px #7b98c6 solid;
  background: #e8f1ff;
  color: #52565e;
  margin: 2px;
`;

const Label = styled.label`
  font-size: 1em;
  margin: 2px;
`;

const TextInputContainer = styled.div`
  display: block;
  margin: 20px auto;
  color: #52565e;
`;

const RightContainer = styled.div`
    float: right;
`

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      turn: 1,
      winningTiles: [],
      isModalOpen: true,
      inputText: '',
      occupiedSquares: [],
    };
  };

  change = (tile) => {
    this.setState((state, props) => {
      const symbol = state.turn % 2 === 0 ? '0' : 'X';
      const newOccupiedSquaresState = state.occupiedSquares.map((value, index) => {
        if (index === tile) {
          return symbol;
        }
        return value;
      });
      const winningTiles = [];
      if (state.turn >= state.n * 2 -1) {
        const r = Math.trunc(tile / state.n);
        const c = tile % state.n;
        const isWinningRow = newOccupiedSquaresState.slice(r * state.n, r * state.n + state.n).every((val) => 
          val === symbol);
        const isWinningColumn = newOccupiedSquaresState
        .filter((value, index) => index % state.n === c)
        .every((val) => val === symbol);

        if (isWinningRow) {
          winningTiles.push(...new Array(state.n).fill(null).map((val, i) => i + (r * state.n)));
        } 

        if (isWinningColumn) {
          winningTiles.push(...new Array(state.n).fill(null).map((val, i) => (state.n * i) + c));
        }

        // We check whether the tile the user just clicked is part of the left to right diagonal.
        // If that's the case we pull the values of that diagonal
        if (r === tile % state.n) {
          const left2RightDiagonal = newOccupiedSquaresState.filter((value, index) => 
            Math.trunc(index / state.n) === index % state.n).every((val) => val === symbol);
          
          if (left2RightDiagonal) {
            winningTiles.push(...new Array(state.n).fill(null).map((val, i) => state.n * i + i ));
          }
        };

        // We check whether the tile the user just clicked is part of the right to left diagonal.
        // If that's the case we pull the values of that diagonal
        if ((r + tile % state.n) === (state.n - 1)) {
          const right2LeftDiagonal = newOccupiedSquaresState.filter((value, index) => 
            (Math.trunc(index / state.n) + index % state.n) === (state.n - 1)).every((val) => val === symbol);
          
          if (right2LeftDiagonal) {
            winningTiles.push(...new Array(state.n).fill(null).map((val, i) => (state.n * i) + state.n - 1 - i));
          }
        }
      }
      return {
        turn: state.turn + 1,
        occupiedSquares: newOccupiedSquaresState,
        winningTiles: Array.from(new Set(winningTiles)),
      };
    });
  };
  
  reset = () => {
    this.setState((state, props) => ({
      turn: 1,
      winningTiles: [],
      inputText: '',
      occupiedSquares: new Array(state.n * state.n).fill(null),
    }))
  };

  changeInput = (e) => this.setState({
    inputText: e.target.value,
  });

  setRowsAndSquaresNumber = () => this.setState((state, props) => ({
    n: parseInt(state.inputText),
    isModalOpen: false,
    occupiedSquares: new Array(parseInt(state.inputText) * parseInt(state.inputText)).fill(null),
  }));

  newTable = () => {
    this.setState((state, props) => ({
      turn: 1,
      winningTiles: [],
      inputText: '',
      occupiedSquares: [],
      isModalOpen: true,
    }))
  };

  render() {
    const squares = this.state.occupiedSquares.map((value, index) => 
      <Tile
        key={index}
        onClick={ !this.state.occupiedSquares[index] && this.state.winningTiles.length === 0 ? 
          (() => this.change(index)) :
          undefined}
        symbol={this.state.occupiedSquares[index]}
        width={`${Math.trunc(600/this.state.n) - 2}px`}
        winnerTile={this.state.winningTiles.includes(index)}
        top={Math.trunc(index / this.state.n) === 0}
        bottom={Math.trunc(index / this.state.n) === (this.state.n - 1)}
        leftEdge={index % this.state.n === 0}
        rightEdge={index % this.state.n === (this.state.n - 1)}
      />
    );

    return (
     <MainWrapper>
       <div>
       <Button onClick={this.reset}> 
          Reset
        </Button>
        <RightContainer>
          <Button onClick={this.newTable}> 
            New board
          </Button>
        </RightContainer>
          {this.state.winningTiles.length === 0 && this.state.occupiedSquares.some((x) => !x) && 
            <Message>
              {'Turn: '}
              <Icon
                color={this.state.turn % 2 === 0 ? 'steelblue' : 'black'}>
                  {this.state.turn % 2 === 0 ? 'O' : 'X'}
              </Icon>
            </Message>
          }
          {this.state.winningTiles.length > 0 && 
            <Message>
              <Icon
                color={(this.state.turn - 1) % 2 === 0 ? 'steelblue' : 'black'}>
                  {(this.state.turn - 1) % 2 === 0 ? 'O' : 'X'}
              </Icon>
              {' Won'}
            </Message>
          }
          {this.state.winningTiles.length === 0 && !this.state.occupiedSquares.some((x) => !x) && this.state.turn > 1 &&
            <Message>
            {'It\'s a draw'}
            </Message>
          }
        <Content>
          {squares}  
        </Content> 
       </div>
       <Modal
        isOpen={this.state.isModalOpen}
        style={{
          content: {
            width: '350px',
            height: '200x',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#c9dfff',
            border: '2px solid #859dc1',
            borderRadius: '5px',
          }
        }}>
        <TextInputContainer>
          <Label for="number">
            Number of rows and columns: 
          </Label>
          <TextInput 
          type="text" 
          name="number"
          value={this.state.inputText}
          onChange={this.changeInput} />
        </TextInputContainer>
        <Button 
          onClick={this.setRowsAndSquaresNumber}
          disabled={!this.state.inputText || isNaN(parseInt(this.state.inputText)) || parseInt(this.state.inputText) < 3}>
          Accept
        </Button>
       </Modal>
     </MainWrapper>
        
    );
  }
}

export default App;
