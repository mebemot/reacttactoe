import React from 'react';
import { Square } from './Square';

export class Board extends React.Component {

    i = 0;

    render() {
        this.i = 0;
        return (<div>
            {this.renderRows()}
        </div>)
    }

    renderRows() {
        const ROWCOUNT = 3;
        const rows = [];
        let r = 0;
        for (r = 0; r < ROWCOUNT; ++r) {
            rows.push(<div key={r} className="board-row">{this.renderCols()}</div>);
        }
        return (rows);
    }

    renderCols() {
        const COLCOUNT = 3;
        const cols = [];
        let c = 0;
        for (c = 0; c < COLCOUNT; ++c && ++this.i) {
            cols.push(this.renderSquare(this.i));
        }
        return (cols);
    }

    renderSquare(i) {
        return (<Square key={i} value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            winningSquare={this.props.winningLine.includes(i)} />
        );
    }



}



