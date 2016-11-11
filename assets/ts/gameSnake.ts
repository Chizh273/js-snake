/// <reference path="../definitions/underscore.d.ts"/>

import {Snake} from "./snake";
import {Position} from "./position";
import {Matrix} from "./matrix";
import {configSnake} from "./configSnake";
import {Cell} from "./cell";

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
                generateFruit: ()=> {
                    this.generateFruit()
                },
                gameOver: ()=> {
                    this.gameOver()
                }
            });

        this.matrix.createMatrix();

        this.generateFruit();
        this.generateFruit();
        this.generateFruit();
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

    gameOver() {
        console.log('game over');
    }

    generateFruit() {
        let cell: Cell;
        while ((cell = this._getRandomCell()) && this._checkCellToMakeFruit(cell)) {
        }
        cell.setClass(this.config.clsFruit);
    }

    _checkCellToMakeFruit(cell: Cell): boolean {
        return cell.hasClass(this.config.clsPoison) ||
            cell.hasClass(this.config.clsSnake) ||
            cell.hasClass(this.config.clsFruit);
    }

    _getRandomCell(): Cell {
        return this.matrix.getCell(
            new Position(
                _.random(0, this.config.sizeGame - 1),
                _.random(0, this.config.sizeGame - 1)
            )
        );
    }
}