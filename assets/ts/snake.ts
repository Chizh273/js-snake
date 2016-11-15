import {Position} from "./position";
import {Matrix} from "./matrix";
import {Cell} from "./cell";
import {configSnake} from "./configSnake";


export class Snake {
    directions = {
        Up: new Position(-1, 0),
        Down: new Position(1, 0),
        Left: new Position(0, -1),
        Right: new Position(0, 1)
    };

    direction = this.directions.Down;
    body: Position[];

    constructor(startPosition: Position[], private matrix: Matrix,
                public config: configSnake,
                public callbacks: {
                    gameOver: Function;
                    snakeEat: Function;
                }) {
        this.body = startPosition;
    }

    move(): Snake {
        let head = this.body[this.body.length - 1];
        let newHead =
            new Position(
                head.x + this.direction.x,
                head.y + this.direction.y
            );

        let cell: Cell = this.matrix.getCell(newHead);
        if (cell.length !== 0) {
            if (cell.hasClass(this.config.clsSnake)) {
                //TODO: die
                this.callbacks.gameOver();
            }
            else if (cell.hasClass(this.config.clsFruit)) {
                this.body.push(newHead);
                this.callbacks.snakeEat();
            }
            else if (cell.hasClass(this.config.clsPoison)) {
                this.callbacks.gameOver();
            }
            else {
                this.body.push(newHead);
                this.removeTail();
            }
        }

        return this;
    }

    removeTail(): Snake {
        let tail = this.body.shift();
        this.matrix.removeClass(tail);

        return this;
    }


    displaySnake(): Snake {
        for (let cell of this.body) {
            //TODO: class 'snake' move to config
            this.matrix.addClassToCell(cell, 'snake');
        }

        return this;
    }

    setDirection(dir: string): void {
        let newDir, oldDir = this.direction;
        if ((newDir = this.directions[dir]) != null) {
            if (newDir.x + oldDir.x !== 0 && newDir.y + oldDir.y !== 0) {
                this.direction = this.directions[dir];
            }
        }
    }
}