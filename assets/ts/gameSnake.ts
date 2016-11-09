import {Snake} from "./snake";
import {Position, Direction} from "./position";
import {Matrix} from "./matrix";

export class GameSnake {
    matrix: Matrix;
    snake: Snake;
    intervalGame;

    constructor(sizeGame: number, public spead: number, elMatrix: JQuery) {
        this.matrix = new Matrix(sizeGame, sizeGame, 20, elMatrix);
        this.snake = new Snake(
            [new Position(1, 1), new Position(1, 2), new Position(1, 3)],
            this.matrix);

        this.matrix.createMatrix();
    }

    start(): void {
        let self = this;
        this.intervalGame = setInterval(function () {
            self.snake.displaySnake().move();
        }, this.spead)
    }

    setDirection(e): void {
        switch (e.which) {
            case 38:
                this.snake.setDirection(Direction.Up);
                break;
            case 40:
                this.snake.setDirection(Direction.Down);
                break;
            case 39:
                this.snake.setDirection(Direction.Right);
                break;
            case 37:
                this.snake.setDirection(Direction.Left);
                break;

        }
    }
}