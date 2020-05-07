import React from 'react';

export function Status({ winner, player }) {
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + player;
    }
    return (

        <div>
            {status}
        </div>);
}
