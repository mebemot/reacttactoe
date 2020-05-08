import React from 'react';
import { Board } from './Board';
import { Status } from './Status';
import { History } from './History'

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const [winner] = calculateWinner(squares)
        if (winner || squares[i]) {
            return;
        }
        squares[i] = whosTurn(this.state.stepNumber);
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    moveIndex: i,
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const [winner, winningLine] = calculateWinner(current.squares);

        return (<div className="game">
            <div className="game-board">
                <Status
                    winner={winner}
                    player={whosTurn(this.state.stepNumber)}
                    stepNumber={this.state.stepNumber}
                />
                <button className="history" onClick={() => this.jumpTo(0)}>RESET</button>
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                    winningLine={winningLine}
                />
            </div>
            <div className="game-info">

                <History
                    history={history}
                    stepNumber={this.state.stepNumber}
                    onClick={(stepNumber) => this.jumpTo(stepNumber)}
                />
            </div>
        </div>);
    }
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]];
        }
    }
    return [null, []];
}

export function whosTurn(stepNumber) {
    let player = stepNumber % 2 === 0 ? 'X' : 'O';
    return (player)
}
