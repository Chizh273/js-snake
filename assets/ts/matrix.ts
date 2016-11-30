import {Position} from './position';
import {Cell} from "./cell";

/**
 * Class Matrix
 * */
export class Matrix {
    private _matrix: Cell[][];

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
        this._matrix = [];
        for (let x = 0; x < this.row; x++) {
            let cellJQuery: JQuery[] = [],
                cells: Cell[] = [];

            for (let y = 0; y < this.col; y++) {
                cellJQuery.push(this._generateCell(x, y));
                cells.push(new Cell(cellJQuery[y]));
            }

            this._matrix.push(cells);
            this.$container.append(cellJQuery);
        }
    }

    /**
     * Get cell by Position
     * @access public
     *
     * @param cell { Position } - position cell
     * @return { Cell }
     * */
    public getCell(cell: Position): Cell {
        cell = this._validateCell(cell);
        return this._matrix[cell.x][cell.y];
    }

    /**
     * Generate Cell
     * @access private
     *
     * @param col { number }
     * @param row { number }
     * @return { JQuery } JQuery element cell
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
     * Validation cell
     * @access private
     *
     * @param cell{ Position }
     * @return { Position }
     * */
    private _validateCell(cell: Position): Position {
        if (cell.x >= this.col) {
            cell.x = 0;
        }
        if (cell.y >= this.row) {
            cell.y = 0;
        }
        if (cell.x < 0) {
            cell.x = this.col - 1;
        }
        if (cell.y < 0) {
            cell.y = this.row - 1;
        }

        return cell;
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