"use strict";

function getRandom(min, max) {
    return parseInt((Math.random() * max) + min);
}

$("#" + config.slider).slider({
    max: -50,
    min: -300
});

$("#" + config.idCol + ", #" + config.idRow).spinner({
    min: 3,
    max: 30
});

$("#" + config.idNumFruit).spinner({
    min: 1,
    max: 20
});

$("#" + config.idWallRadioBtn + ", #" + config.idPoisonRadioBtn).buttonset();


$("#" + config.idBtnStart).click( function () {
        conf();
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

$("#" + config.idBtnSetting).click(
    function () {
        $('.' + config.setting).show();
        $('.' + config.classPanel).hide();
        $("." + config.classGameOver).hide();
        $("#snake1").hide();
    }
);

var conf = function () {
    config.walls = $('input[name=walls]:checked').attr('id') == config.idWallsRadioYes ? true : false;
    config.poison = $('input[name=poison]:checked').attr('id') == config.idPoisonRadioYes ? true : false;

    config.NumCol = parseInt($("#" + self.config.idCol).val());
    config.NumRow = parseInt($("#" + self.config.idRow).val());

    config.speadSnake = $("#" + self.config.slider).slider("value") * (-1);
};