import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Symbol from './Symbol';

const Container = styled.div`
    border: 1px solid #abcdef;
    width: ${props => props.width ? props.width : '0'};
    height: ${props => props.height ? props.height : '0'};
    background-color: ${props => props.winnerTile ? '#4a66b5' : 'transparent'};
    margin: 0;
`;

function Tile(props){
    return (
        <Container
          onClick={props.onClick}
          width={props.width}
          height={props.width}
          winnerTile={props.winnerTile}
          >
            {props.symbol && (
                <Symbol
                    color='black'
                    symbol={props.symbol}
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
}

export default Tile;