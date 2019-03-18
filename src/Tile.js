import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Symbol from './Symbol';

const Container = styled.div`
    border-top: ${props => !props.top ? '1px solid #abcdef': '0 none'};
    border-bottom: ${props => !props.bottom ? '1px solid #abcdef': '0 none'};
    border-left: ${props => !props.leftEdge ? '1px solid #abcdef': '0 none'};
    border-right: ${props => !props.rightEdge ? '1px solid #abcdef': '0 none'};
    width: ${props => props.width ? props.width : '0'};
    height: ${props => props.height ? props.height : '0'};
    background-color: ${props => props.winnerTile ? '#c4d0f3' : 'transparent'};
    margin: 0;
    display: inline-block;
    cursor:pointer;
`;

function Tile(props){
    return (
        <Container
          onClick={props.onClick}
          width={props.width}
          height={props.width}
          winnerTile={props.winnerTile}
          top={props.top}
          bottom={props.bottom}
          leftEdge={props.leftEdge}
          rightEdge={props.rightEdge}
          >
            {props.symbol && (
                <Symbol
                    color={props.symbol === 'X' ? 'black' : 'steelblue'}
                    symbol={props.symbol}
                    width={`${parseInt(props.width) - 10}px`}
                />
            )}
        </Container>
    )
}

Tile.propTypes = {
    width: PropTypes.string.isRequired,
    symbol: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    winnerTile: PropTypes.bool.isRequired,
    top: PropTypes.bool.isRequired,
    bottom: PropTypes.bool.isRequired,
    leftEdge: PropTypes.bool.isRequired,
    rightEdge: PropTypes.bool.isRequired,
}

export default Tile;