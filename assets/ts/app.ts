import {GameSnake} from "./gameSnake";
import {configSnake} from "./configSnake";

let game = new GameSnake(
    $('.game'),
    $('.status'),
    new configSnake('snake', 'fruit', 'poison', 20, 100));

game.start();

$(window).keydown((e: JQueryKeyEventObject) => {
    game.setDirection(e);
})

$('.btn-start').click(() => {
    $('.game-over').remove();
    game.restart();
});