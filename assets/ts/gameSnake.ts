import {Snake} from "./snake";
import {Position} from "./position";
import {Matrix} from "./matrix";
import {configSnake} from "./configSnake";
import {Cell} from "./cell";
import {Score} from "./score";

/**
 * Class GameSnake
 * */
export class GameSnake {
    private _matrix: Matrix;
    private _snake: Snake;
    private _intervalGame;
    private _score: Score;

    /**
     * Create GameSnake
     *
     * @param elMatrix { JQuery }
     * @param elStatus { JQuery }
     * @param config { configSnake }
     * */
    constructor(protected elMatrix: JQuery,
                protected elStatus: JQuery,
                public config: configSnake) {
        this._score = new Score(elStatus);
    }

    /**
     * Restart game
     *
     * @return { void }
     * */
    public restart(): void {
        this.start();
    }

    /**
     * Start game
     * @access public
     *
     * @return { void }
     * */
    public start(): void {
        this._score.resetScore();
        this._create();
        clearInterval(this._intervalGame);
        this._intervalGame = setInterval(() => {
            this._snake.move();
        }, this.config.speed);
    }

    /**
     * Set direction snake
     * @access public
     *
     * @param event { JQueryKeyEventObject }
     * @return { void }
     * */
    public setDirection(event: JQueryKeyEventObject): void {
        switch (event.which) {
            case 38:
                this._snake.setDirection('Up');
                break;
            case 40:
                this._snake.setDirection('Down');
                break;
            case 39:
                this._snake.setDirection('Right');
                break;
            case 37:
                this._snake.setDirection('Left');
                break;
        }
    }

    /**
     * Create game
     * @access private
     *
     * @return { void }
     * */
    private _create(): void {
        this._matrix = new Matrix(this.config.sizeGame, this.config.sizeGame, 20, this.elMatrix);

        this._snake = new Snake(
            [new Position(1, 1), new Position(1, 2), new Position(1, 3)],
            this._matrix, this.config, {
                snakeEat: () => {
                    this._generateFruit()
                    this._score.updateScore();
                },
                gameOver: () => {
                    this._gameOver()
                }
            });

        this._matrix.createMatrix();

        this._generateFruit();
        this._generateFruit();
        this._generateFruit();
    }

    /**
     * Stop game
     * @access private
     *
     * @return { void }
     * */
    private _gameOver(): void {
        clearInterval(this._intervalGame);

        console.log('game over');
    }

    /**
     * Generate fruit
     * @access private
     *
     * @return { void }
     * */
    private _generateFruit(): void {
        let cell: Cell;
        while ((cell = this._getRandomCell()) && this._checkCellToMakeFruit(cell)) {
        }
        cell.setClass(this.config.clsFruit);
    }

    /**
     * Check cell to make fruit
     * @access private
     *
     * @return { boolean }
     * */
    private _checkCellToMakeFruit(cell: Cell): boolean {
        return cell.hasClass(this.config.clsPoison) ||
            cell.hasClass(this.config.clsSnake) ||
            cell.hasClass(this.config.clsFruit);
    }

    /**
     * Get random cell
     * @access private
     *
     * @return { Cell }
     * */
    private _getRandomCell(): Cell {
        return this._matrix.getCell(
            new Position(
                _.random(0, this.config.sizeGame - 1),
                _.random(0, this.config.sizeGame - 1)
            )
        );
    }
}