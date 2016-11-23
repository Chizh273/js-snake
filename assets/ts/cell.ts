/// <reference path="../../typings/tsd.d.ts" />

/**
 * Class Cell
 * */
export class Cell {
    cell: JQuery;
    length: number;

    /**
     * Create cell
     * @access public
     *
     * @param cell { JQuery } - JQuery object
     * */
    constructor(cell: JQuery) {
        this.cell = cell;
        this.length = cell.length;
    }

    /**
     * Is has class in this cell
     * @access public
     *
     * @param className{ string }
     * @return { boolean }
     * */
    hasClass(className: string): boolean {
        return this.cell.hasClass(className);
    }

    /**
     * Set class this cell
     * @access public
     *
     * @param className { string }
     * @return { void }
     * */
    setClass(className: string): void {
        this.cell.addClass(className);
    }

    /**
     * Remove class className or all class this cell
     * @access public
     *
     * @param className { string }
     * @return { void }
     * */
    removeClass(className: string = null): void {
        if (className) {
            this.cell.removeClass(className);
        }
        else {
            this.cell.removeClass();
        }
    }
}