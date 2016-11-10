import {Snake} from "./snake";
import {Position} from "./position";
import {Matrix} from "./matrix";
import {configSnake} from "./configSnake";

export class GameSnake {
    matrix: Matrix;
    snake: Snake;
    intervalGame;

    constructor(elMatrix: JQuery, public config: configSnake) {
        this.matrix = new Matrix(
            this.config.sizeGame,
            this.config.sizeGame,
            20,
            elMatrix);

        this.snake = new Snake(
            [new Position(1, 1), new Position(1, 2), new Position(1, 3)],
            this.matrix, this.config, {
                generateFruit: this.generateFruit,
                gameOver: this.gameOver
            });

        this.matrix.createMatrix();
    }

    start(): void {
        this.intervalGame = setInterval(() => {
            this.snake.displaySnake().move();
        }, this.config.speed);
    }

    setDirection(e): void {
        switch (e.which) {
            case 38:
                this.snake.setDirection('Up');
                break;
            case 40:
                this.snake.setDirection('Down');
                break;
            case 39:
                this.snake.setDirection('Right');
                break;
            case 37:
                this.snake.setDirection('Left');
                break;
        }
    }

    gameOver(){
        console.log('game over');
    }

    generateFruit(){
        console.log('add fruit');
    }
}