import {Position, Direction} from "./position";
import {Matrix} from "./matrix";


export class Snake {
    direction = Direction.Down;
    body: Position[];

    constructor(startPosition: Position[], private matrix: Matrix) {
        this.body = startPosition;
    }

    move(): Snake {
        let head = this.body[this.body.length - 1];
        let newHead = new Position(head.x + this.direction.x, head.y + this.direction.y);
        if (this.matrix.getCell(newHead) != null) {
            this.body.push(newHead);
        }
        this.displaySnake();

        return this;
    }

    displaySnake(): Snake {
        for (let cell of this.body) {
            this.matrix.addClassToCell(cell, 'snake');
        }

        return this;
    }

    setDirection(dir: Position): void {
        this.direction = dir;
    }
}