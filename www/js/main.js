"use strict";

var Main = function (config) {

    var self = this;

    self.jsonRecord;

    self.config = config;


    self.init = function () {
        $("#" + self.config.slider).slider({
            max: -50,
            min: -300
        });

        $("#" + self.config.idCol + ", #" + self.config.idRow).spinner({
            min: 3,
            max: 30
        });

        $("#" + self.config.idNumFruit).spinner({
            min: 1,
            max: 20
        });

        $("#" + self.config.idWallRadioBtn + ", #" + self.config.idPoisonRadioBtn).buttonset();
    };

    self.clickBtnStart = function () {
        conf();
        var game = new GameSnake("#snake1", self.config);
        $("#snake1").show();
        $('.' + self.config.classPanel).show();
        $(".row").show();
        $(this).hide();
        $("." + self.config.classGameOver).hide();
        $('.' + self.config.setting).hide();
        game.start();
    };

    self.clickBtnStartAgain = function () {
        $("." + self.config.classGameOver).hide();
        self.clickBtnStart();
    };

    self.clickBtnSetting = function () {
        $('.' + self.config.setting).show();
        $('.' + self.config.classPanel).hide();
        $("." + self.config.classGameOver).hide();
        $("#snake1").hide();
    };

    self.clickBtnViewRecord = function () {
        requestAjax();
        console.log(this);
        $('.' + self.config.classAlertRecord).dialog({
                modal: true,
                width: 612,
                height: 350,
                buttons: {
                    "Ok": function () {
                        $(this).dialog('close');
                    }
                }
            }
        );
    };

    var conf = function () {
        self.config.walls = $('input[name=walls]:checked').attr('id') == self.config.idWallsRadioYes ? true : false;
        self.config.poison = $('input[name=poison]:checked').attr('id') == self.config.idPoisonRadioYes ? true : false;

        self.config.NumCol = parseInt($("#" + self.config.idCol).val());
        self.config.NumRow = parseInt($("#" + self.config.idRow).val());

        self.config.speadSnake = $("#" + self.config.slider).slider("value") * (-1);
    };
};