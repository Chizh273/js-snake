"use strict";

var Main = function (config) {

    var self = this;

    var oldColon, oldClass;

    self.jsonRecord;

    self.config = config;

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
        $("." + self.config.classDivRecord).show();
        $('.' + self.config.setting).hide();
    };

    self.clickBtnBack = function () {
        $("." + self.config.classDivRecord).hide();
        $('.' + self.config.setting).show();
    };

    self.clickTagOrderBy = function ($this) {
        window.col = $($this).attr("class");
        window.orderBy = $($this).attr("order-by") == null ?
            ($($this).attr("order-by", "min"), "min") :
            ($($this).attr("order-by") === "max" ?
                ($($this).attr("order-by", "min"), "min") :
                ($($this).attr("order-by", "max"), "max"));

        console.log(window.col, window.orderBy);

        var orderStyle = ( window.orderBy === "max" ) ?
            "glyphicon-triangle-top" : "glyphicon-triangle-bottom";

        if (oldColon != null) {
            oldColon.removeClass(oldClass);
        }
        var span = $($this).find("span");
        span.addClass(orderStyle);

        oldColon = $($this).find("span");
        oldClass = orderStyle;

        self.jsonRecord.sort(sortArray);

        renderRecord(self.jsonRecord);
    };

    var init = function () {
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

        $("input[data-type=setting]").tooltip({
            position: {
                my: "left top",
                at: "right+5 top-5"
            }
        });
    };

    var conf = function () {

        self.config.walls = $('input[name=walls]:checked').attr('id') == self.config.idWallsRadioYes ? true : false;
        self.config.poison = $('input[name=poison]:checked').attr('id') == self.config.idPoisonRadioYes ? true : false;

        self.config.NumCol = parseInt($("#" + self.config.idCol).val());
        self.config.NumRow = parseInt($("#" + self.config.idRow).val());

        self.config.speadSnake = $("#" + self.config.slider).slider("value") * (-1);
    };

    var sortArray = function (a, b) {
        if (window.orderBy === "min") {
            var c = a;
            a = b;
            b = c;
        }

        a = a[window.col];
        b = b[window.col];

        if (window.col == "score" || window.col == "time") {
            a = parseInt(a);
            b = parseInt(b);
        }
        if (a > b) return 1;
        if (a < b) return -1;
    };

    init();
};