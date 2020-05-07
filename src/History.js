import React from 'react';
import {whosTurn} from './Game'

export function History({ history, stepNumber, onClick }) {
    const [, ...actualMoves] = history
    const moves = actualMoves.map((step, index) => {
        const i = index + 1;
        var currentclass;
        if (stepNumber === i) {
            currentclass = "historyCurrent";
        }
        else {
            currentclass = "history";
        }
        return (
            <li key={i}>
                <button className={currentclass} onClick={() => onClick(i)}>{whosTurn(index)}({Math.floor(step.moveIndex / 3) + 1}, {(step.moveIndex % 3) + 1})</button>
            </li>
        );
    });
    return (

        <ol>{moves}</ol>
    )
}
