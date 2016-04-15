"use strict";

function getRandom(min, max) {
    return parseInt((Math.random() * max) + min);
}

$("#" + config.slider).slider({
    //value: -500
});


$("#" + config.idBtnStart).click(
    function () {
        var game = new GameSnake("#snake1", config);
        game.start();

        $(this).hide();
        $('#' + config.idCol).hide();
        $('#' + config.idRow).hide();
        $(".row").show();
    }
);

