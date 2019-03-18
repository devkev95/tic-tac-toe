import React from 'react';
import PropTypes from 'prop-types';

function Symbol(props) {
    return (
        <svg viewBox="0 0 40 40">
            <path
                style={{
                    stroke: props.color || 'white',
                    fill: 'transparent',
                    strokeWidth: 5,
                    strokeLinecap: 'square',
                }} 
                d={`${props.symbol === 'X' ?
                'M 5,5 L 35,35 M 35,5 L 5,35' :
                `M 20, 20
                 m -15, 0
                 a 15,15 0 1,0 30,0
                 a 15,15 0 1,0 -30,0`}`} />
        </svg>
    )
}

Symbol.propTypes = {
    symbol: PropTypes.string.isRequired,
    color: PropTypes.string,
}

export default Symbol;