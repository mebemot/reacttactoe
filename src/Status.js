import React from 'react';
import { Board } from './Board';

export function Status({ winner, player, stepNumber }) {
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    }
    else if (stepNumber === Board.ROWCOUNT * Board.COLCOUNT) {
        status = 'Draw:(';
    }
    else {
        status = 'Next player: ' + player;
    }
    return (

        <div>
            {status}
        </div>);
}
