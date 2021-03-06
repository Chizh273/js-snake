import {Position} from "./position";
import {Matrix} from "./matrix";
import {Cell} from "./cell";
import {configSnake} from "./configSnake";

/**
 * Class Snake
 * */
export class Snake {
    private _directions = {
        Up: new Position(-1, 0),
        Down: new Position(1, 0),
        Left: new Position(0, -1),
        Right: new Position(0, 1)
    };

    private _direction = this._directions.Down;
    private body: Position[];

    /**
     * Create Snake
     *
     * @param startPosition { Position[] }
     * @param matrix { Matrix }
     * @param config { configSnake }
     * @param callbacks { {
                    gameOver: Function;
                    snakeEat: Function;
                } }
     * */
    constructor(startPosition: Position[], private matrix: Matrix,
                private config: configSnake,
                private callbacks: {
                    gameOver: Function;
                    snakeEat: Function;
                }) {
        this.body = startPosition;
    }

    /**
     * Move snake
     * @access public
     *
     * @return { Snake }
     * */
    public move(): Snake {
        let head = this.body[this.body.length - 1],
            newHead = new Position(head.x + this._direction.x, head.y + this._direction.y),
            cell: Cell = this.matrix.getCell(newHead);

        if (cell.length !== 0) {
            if (cell.hasClass(this.config.clsSnake)
                || cell.hasClass(this.config.clsPoison)) {
                this.callbacks.gameOver();
            }
            else if (cell.hasClass(this.config.clsFruit)) {
                this.body.push(newHead);
                this.callbacks.snakeEat();
            }
            else {
                this.body.push(newHead);
                this._removeTail();
            }
        }
        this._displaySnake();

        return this;
    }

    /**
     * Set direction snake
     * @access public
     *
     * @return { void }
     * */
    public setDirection(dir: string): void {
        let newDir, oldDir = this._direction;
        if ((newDir = this._directions[dir]) != null) {
            if (newDir.x + oldDir.x !== 0 && newDir.y + oldDir.y !== 0) {
                this._direction = this._directions[dir];
            }
        }
    }

    /**
     * Remove tail snake
     * @access private
     *
     * @return { void }
     * */
    private _removeTail(): void {
        let tail = this.body.shift();
        this.matrix.getCell(tail).removeClass();
    }

    /**
     * Display snake
     * @access private
     *
     * @return { void }
     * */
    private _displaySnake(): void {
        for (let cell of this.body) {
            this.matrix.getCell(cell).setClass(this.config.clsSnake);
        }
    }

}