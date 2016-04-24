"use strict";

function getRandom(min, max) {
    return parseInt((Math.random() * max) + min);
}

$("#" + config.slider).slider({
    max: -50,
    min: -300
});


$("#" + config.idBtnStart).click(
    function () {
        var game = new GameSnake("#snake1", config);
        $("#snake1").show();
        $('.' + config.classPanel).show();
        $(".row").show();
        $(this).hide();
        $("." + config.classGameOver).hide();
        $('.' + config.setting).hide();
        game.start();
    }
);

$("#" + config.idBtnStartAgain).click(
    function () {
        $("." + config.classGameOver).hide();
        $("#" + config.idBtnStart).click();
    }
);

$("#" + config.idBtnSetting)
    .click(
        function () {
            $('.' + config.setting).show();
            $('.' + config.classPanel).hide();
            $("." + config.classGameOver).hide();
            $("#snake1").hide();
        }
    );

