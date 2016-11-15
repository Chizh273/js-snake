/// <reference path="../../typings/tsd.d.ts" />


export class Cell {
    cell: JQuery;
    length: number;

    constructor(cell: JQuery) {
        this.cell = cell;
        this.length = cell.length;
    }

    hasClass(className: string): boolean {
        return this.cell.hasClass(className);
    }

    setClass(className): void {
        this.cell.addClass(className);
    }

    removeClass(className = null) {
        if (className) {
            this.cell.removeClass(className);
        }
        else {
            this.cell.removeClass();
        }
    }
}