/// <reference path="../definitions/jquery.d.ts"/>

import {Position} from './position';
import {Cell} from "./cell";

export class Matrix {
    matrixSizeWidth: number;
    matrixSizeHeight: number;

    constructor(public row: number, public col: number,
                public sizeCell: number, public $container: JQuery) {

        this.matrixSizeHeight = row * sizeCell + 1;
        this.matrixSizeWidth = col * sizeCell + 1;
        $container.css({
            "width": this.matrixSizeWidth,
            "height": this.matrixSizeHeight
        });
    }

    createMatrix() {
        let matrixCells: JQuery[] = [];
        for (let x = 0; x < this.row; x++) {
            for (let y = 0; y < this.col; y++) {
                matrixCells.push(this.generateCell(x, y));
            }
        }
        this.$container.append(matrixCells);
    }

    generateCell(x: number, y: number): JQuery {
        return $('<div>')
            .attr({
                "data-col": x,
                "data-row": y
            })
            .css({
                "width": this.sizeCell,
                "height": this.sizeCell
            });
    }

    getCell(cell: Position): Cell {
        return new Cell(
            this.$container
                .find(`[data-col=${cell.x}][data-row=${cell.y}]`)
        );
    }


    addClassToCell(cell: Position, className: string) {
        this.getCell(cell).setClass(className);
    }

    removeClass(tail: Position) {
        this.getCell(tail).removeClass();
    }
}