"use strict";
var GameSnake = function (container, config) {
    var self = this;

    self.config = config;

    var col = $("#" + self.config.idCol).val(),
        row = $("#" + self.config.idRow).val();
    self.$container = $(container);

    self.matrix = new Matrix(col, row, $(container), $('.' + self.config.classMainContainer), config);
    self.snake = new Snake(self.matrix, config);
    self.time = 0;
    self.scope = 0;
    self.pause = true;

    self.status = true;


    self.constructor = function () {
        self.delete();
        self.create();
        $('.' + self.config.classTime).html(0);
        self.intervalLife = setInterval(
            function () {
                if (self.pause) {
                    $('.' + self.config.classTime).html(self.time++);
                }
            }, 1000
        );
    };

    self.create = function () {
        self.matrix.create();
        self.snake.create();
        self.setFruit();
        self.setFruit();
    };

    self.delete = function () {
        self.$container.children().remove();
    };

    self.start = function () {
        self.spead = $("#" + self.config.slider).slider("value") * (-1);
        self.intervalMove = setInterval(function () {
            if (self.snake.status && self.pause) {
                self.status = true;
                self.snake.move();
            }
            else if (!self.snake.status) {
                self.gameOver();
            }
            if (self.snake.eat) {
                self.setFruit();
                self.snake.eat = !self.snake.eat;
            }
        }, self.spead);
    };

    self.gameOver = function () {

        if (self.status) {
            self.status = false;
            $('#' + self.config.idCol).show();
            $('#' + self.config.idRow).show();

            $('#' + self.config.idBtnStart).show().html('New game');

            self.pause = false;
            clearInterval(self.intervalMove);
            $('.' + self.config.classAlert).dialog({
                    modal: true,
                    buttons: {
                        Ok: function () {
                            $(this).dialog('close');
                        },
                        "Send score": function () {
                            //$.ajax();
                        }
                    }
                }
            );
        }
    };

    self.keyDown = function (event) {
        switch (event.keyCode) {
            case 32://Space
                if (self.snake.status)
                    self.pause = !self.pause;
                break;

            case 37://Left
                self.snake.course = {x: -1, y: 0};
                break;
            case 38://Up
                self.snake.course = {x: 0, y: -1};
                break;
            case 39://Right
                self.snake.course = {x: 1, y: 0};
                break;
            case 40://Down
                self.snake.course = {x: 0, y: 1};
                break;
        }
    };

    self.setFruit = function () {
        var position = {x: getRandom(1, col), y: getRandom(1, row)};
        while (self.matrix.checkCellClass(position, self.config.classSnake)) {
            position = {
                x: getRandom(1, col),
                y: getRandom(1, row)
            };
        }
        self.matrix.setCellClass(position, self.config.classFruit);
        $('.' + self.config.classScore).html(self.snake.body.length - 3);
    };

    $(document).keydown(function (e) {
        self.keyDown(e);
    });

    $("#" + self.config.slider).slider({
        max: -50,      
        min: -1000,

        slide: function (event, ui) {
            self.spead = $(this).slider("value") * (-1);
            clearInterval(self.intervalMove);
            self.start();
        }
    });

    self.constructor();
};