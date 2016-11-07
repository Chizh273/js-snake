/// <reference path="../definitions/jquery.d.ts"/>

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
        return $('<div>').attr({
            "data-row": x,
            "data-col": y
        }).css({
            "width": this.sizeCell,
            "height": this.sizeCell
        }).text((x) + ';' + (y));
    }

    getCell(row: number, col: number): JQuery {
        return this.$container
            .find(`[data-row=${row}][data-col=${col}]`);
    }
}