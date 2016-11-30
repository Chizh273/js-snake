import {GameSnake} from "./gameSnake";
import {configSnake} from "./configSnake";

let game = new GameSnake(
    $('.game'),
    new configSnake('snake', 'fruit', 'poison', 20, 100));
game.start();

$(window).keydown(function (e) {
    game.setDirection(e);
})

$('.btn-start').click(function () {
    $('.game-over').remove();
    game.restart();
});