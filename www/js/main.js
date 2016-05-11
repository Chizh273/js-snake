"use strict";

function getRandom(min, max) {
    return parseInt((Math.random() * max) + min);
}

var renderRecord = function (data) {
    var tab = $("." + self.config.classTableTbodyRecord);
    tab.children().remove();
    var tabTemplate = new EJS({url: "view/record.ejs"});
    var html = tabTemplate.render({arr: data});
    tab.html(html);
};

var requestAjax = function () {
    $.post('/server/ajax.php', function (data) {
        renderRecord(data);
        self.jsonRecord = data;
    }, "json");
};


var Main = function (config) {

    var self = this;

    self.jsonRecord;

    self.config = config;

    var oldColon, oldClass;

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

    self.clickTagTheadDiv = function () {
        window.col = $(this).attr("class");
        window.orderBy = $(this).attr("order-by") == null ? ($(this).attr("order-by", "min"), "min") : ($(this).attr("order-by") === "max" ? ($(this).attr("order-by", "min"), "min") : ($(this).attr("order-by", "max"), "max"));

        var orderStyle = ( window.orderBy === "max" ) ?
            "glyphicon-triangle-top" : "glyphicon-triangle-bottom";

        if (oldColon != null) {
            oldColon.removeClass(oldClass);
        }
        var span = $(this).find("span");
        span.addClass(orderStyle);

        oldColon = $(this).find("span");
        oldClass = orderStyle;

        self.jsonRecord.sort(sortArray);

        renderRecord(self.jsonRecord);
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

    var conf = function () {
        self.config.walls = $('input[name=walls]:checked').attr('id') == self.config.idWallsRadioYes ? true : false;
        self.config.poison = $('input[name=poison]:checked').attr('id') == self.config.idPoisonRadioYes ? true : false;

        self.config.NumCol = parseInt($("#" + self.config.idCol).val());
        self.config.NumRow = parseInt($("#" + self.config.idRow).val());

        self.config.speadSnake = $("#" + self.config.slider).slider("value") * (-1);
    };
};