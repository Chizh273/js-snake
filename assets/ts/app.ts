/// <reference path="../definitions/jquery.d.ts"/>


import {GameSnake} from "./gameSnake";

let game = new GameSnake(20, 500, $('.game'));
game.start();

$(window).keydown(function (e) {
    game.setDirection(e);
})