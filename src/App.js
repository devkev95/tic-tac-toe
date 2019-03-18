import React, { Component } from 'react';
import styled from 'styled-components';

import Tile from './Tile';

const MainWrapper = styled.div`
width: 100%;
height; 100%;
`

const Content = styled.div`
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const n = 3;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      turn: 1,
      occupiedSquares: new Array(n*n).fill(null),
      winningTiles: [],
    };
  }

  change = (tile) => {
    this.setState((state, props) => {
      const symbol = (state.turn + 1) % 2 === 0 ? 'X' : '0';
      const newOccupiedSquaresState = state.occupiedSquares.map((value, index) => {
        if (index === tile) {
          return symbol;
        }
        return value;
      });
      const winningTiles = [];
      if (state.turn >= n * 2 -1) {
        const r = Math.trunc(tile / n);
        const c = tile % n;
        const isWinningRow = newOccupiedSquaresState.slice(r * n, r * n + n).every((val) => 
          val === symbol);
        const isWinningColumn = newOccupiedSquaresState
        .filter((value, index) => index % n === c)
        .every((val) => val === symbol);

        if (isWinningRow) {
          console.log("winning Row");
          winningTiles.push(...new Array(n).fill(null).map((val, i) => i + (r * n)));
        } 

        if (isWinningColumn) {
          console.log("winning Column");
          winningTiles.push(...new Array(n).fill(null).map((val, i) => (n * i) + c));
        }

        // We check whether the tile the user just clicked is part of the left to right diagonal.
        // If that's the case we pull the values of that diagonal
        if (r === tile % n) {
          const left2RightDiagonal = newOccupiedSquaresState.filter((value, index) => 
            Math.trunc(index / n) === index % n).every((val) => val === symbol);
          
          if (left2RightDiagonal) {
            console.log("winning Left to Right Diagonal");
            winningTiles.push(...new Array(n).fill(null).map((val, i) => n * i + i ));
          }
        };

        // We check whether the tile the user just clicked is part of the right to left diagonal.
        // If that's the case we pull the values of that diagonal
        if ((r + tile % n) === (n - 1)) {
          const right2LeftDiagonal = newOccupiedSquaresState.filter((value, index) => 
            (Math.trunc(index / n) + index % n) === (n - 1)).every((val) => val === symbol);
          
          if (right2LeftDiagonal) {
            console.log("winning Right to Left Diagonal");
            winningTiles.push(...new Array(n).fill(null).map((val, i) => (n * i) + n - 1 - i));
          }
        }
      }
      return {
        turn: state.turn + 1,
        occupiedSquares: newOccupiedSquaresState,
        winningTiles: Array.from(new Set(winningTiles)),
      }
    });
  };
  

  render() {
    const squares = this.state.occupiedSquares.map((value, index) => 
      <Tile
        key={index}
        onClick={ !this.state.occupiedSquares[index] && this.state.winningTiles.length === 0 ? 
          (() => this.change(index)) :
          undefined}
        symbol={this.state.occupiedSquares[index]}
        width='150px'
        winnerTile={this.state.winningTiles.includes(index)}
      />
    );
    return (
     <MainWrapper>
       <Content>
         {squares}  
       </Content>
     </MainWrapper>
        
    );
  }
}

export default App;
