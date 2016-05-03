"use strict";

function getRandom(min, max) {
    return parseInt((Math.random() * max) + min);
}

$("#" + config.slider).slider({
    max: -50,
    min: -300
});

$("#" + config.idCol).spinner({
    min: 3,
    max: 35
});
$("#" + config.idRow).spinner({
    min: 3,
    max: 30
});
$("#" + config.idNumFruit).spinner({
    min: 1,
    max: 20
});

$("#" + config.idWallRadioBtn + ", #" + config.idPoisonRadioBtn).buttonset();


$("#" + config.idBtnStart).click(
    function () {
        config.walls = $('input:checked').attr('id') == config.idWallsRadioYes ? true : false;
        config.NumCol = parseInt($("#" + self.config.idCol).val());
        config.NumRow = parseInt($("#" + self.config.idRow).val());
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

