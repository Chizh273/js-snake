/// <reference path="../definitions/jquery.d.ts"/>

import {Matrix} from "./matrix";
import {Snake} from  "./snake";
import {GameSnake} from "./gameSnake";

let matrix: Matrix = new Matrix(10, 10, 40, $('.game'));
matrix.createMatrix();


// let snake = new Snake();
// let game = new GameSnake();


