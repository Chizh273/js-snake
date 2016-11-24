/// <reference path="../../typings/tsd.d.ts" />

import {Snake} from "./snake";
import {Position} from "./position";
import {Matrix} from "./matrix";
import {configSnake} from "./configSnake";
import {Cell} from "./cell";
import {Label} from "./label";

/**
 * Class GameSnake
 * */
export class GameSnake {
    private _matrix: Matrix;
    private _snake: Snake;
    private _intervalGame;
    private _score: number = 0;
    private _scoreLabel: Label = new Label(`Score: ${this._score}`, 'score');


    /**
     * Create GameSnake
     *
     * @param elMatrix { JQuery }
     * @param config { configSnake }
     * */
    constructor(public elMatrix: JQuery, public config: configSnake) {
        this._scoreLabel.show();
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
                snakeEat: ()=> {
                    this._generateFruit()
                    this._scoreLabel.setText(`Score: ${++this._score}`);
                },
                gameOver: ()=> {
                    this._gameOver()
                }
            });

        this._matrix.createMatrix();

        this._generateFruit();
        this._generateFruit();
        this._generateFruit();
    }

    /**
     * Restart game
     *
     * @return { void }
     * */
    restart(): void {
        this._score = 0;
        this._scoreLabel.setText(`Score: ${this._score}`);

        this.start();
    }

    /**
     * Start game
     * @access public
     *
     * @return { void }
     * */
    start(): void {
        this._create();
        clearInterval(this._intervalGame);
        this._intervalGame = setInterval(() => {
            this._snake.displaySnake().move();
        }, this.config.speed);
    }

    /**
     * Set _direction snake
     * @access public
     *
     * @param event { JQueryKeyEventObject }
     * @return { void }
     * */
    setDirection(event: JQueryKeyEventObject): void {
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
     * Stop game
     * @access private
     *
     * @return { void }
     * */
    _gameOver():void {
        clearInterval(this._intervalGame);

        let l = new Label(`Game over! You score: ${this._score}`, 'game-over');
        l.show();

        console.log('game over');
    }

    /**
     * Generate fruit
     * @access private
     *
     * @return { void }
     * */
    _generateFruit():void {
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
    _checkCellToMakeFruit(cell: Cell): boolean {
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
    _getRandomCell(): Cell {
        return this._matrix.getCell(
            new Position(
                _.random(0, this.config.sizeGame - 1),
                _.random(0, this.config.sizeGame - 1)
            )
        );
    }
}