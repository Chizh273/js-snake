/// <reference path="../../typings/tsd.d.ts" />


import {Position} from './position';
import {Cell} from "./cell";
/**
 * Class Matrix
 * */
export class Matrix {
    private _matrixSizeWidth: number;
    private _matrixSizeHeight: number;

    /**
     * Create Matrix
     *
     * @param row { number }
     * @param col { number }
     * @param sizeCell { number }
     * @param $container { jQuery }
     * */
    constructor(public row: number, public col: number,
                public sizeCell: number, public $container: JQuery) {

        this._removeCellMatrix();
        this._matrixSizeHeight = row * sizeCell + 1;
        this._matrixSizeWidth = col * sizeCell + 1;
        $container.css({
            "width": this._matrixSizeWidth,
            "height": this._matrixSizeHeight
        });
    }

    /**
     * Create matrix
     * @access public
     *
     * @return { void }
     * */
    public createMatrix(): void {
        let matrixCells: JQuery[] = [];
        for (let x = 0; x < this.row; x++) {
            for (let y = 0; y < this.col; y++) {
                matrixCells.push(this._generateCell(x, y));
            }
        }
        this.$container.append(matrixCells);
    }

    /**
     * Generate Cell
     * @access private
     *
     * @param col { number }
     * @param row { number }
     * @return { JQuery } - JQuery element cell
     * */
    private _generateCell(col: number, row: number): JQuery {
        return $('<div>')
            .attr({
                "data-col": col,
                "data-row": row
            })
            .css({
                "width": this.sizeCell,
                "height": this.sizeCell
            });
    }

    /**
     * Get cell by Position
     * @access public
     *
     * @param cell { Position } - position cell
     * @return { Cell }
     * */
    public getCell(cell: Position): Cell {
        return new Cell(
            this.$container
                .find(`[data-col=${cell.x}][data-row=${cell.y}]`)
        );
    }

    /**
     * TODO: need review
     * */
    addClassToCell(cell: Position, className: string) {
        this.getCell(cell).setClass(className);
    }

    /**
     * TODO: need review
     * */
    removeClass(tail: Position) {
        this.getCell(tail).removeClass();
    }

    /**
     * Clear old matrix
     * @access private
     *
     * @return { void }
     * */
    private _removeCellMatrix(): void {
        this.$container.children().remove();
    }
}