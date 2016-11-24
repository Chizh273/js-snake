"use strict";
var GameSnake = function (container, config) {
        var self = this;

        self.config = config;
        self.$container = $(container);
        self.matrix = new Matrix($(container), $('.' + self.config.classMainContainer), config);
        self.snake = new Snake(self.matrix, config);
        self.time = 0;
        self.scope = 0;
        self.pause = true;
        self.numFruit = $("#" + self.config.idNumFruit).val();

        self.status = true;


        self.constructor = function () {
            self.delete();
            self.create();
            $('span.' + self.config.classTime).html(0);
            self.intervalLife = setInterval(
                function () {
                    if (self.pause) {
                        $('span.' + self.config.classTime).html(self.time++);
                    }
                }, 1000
            );
        };

        self.create = function () {
            self.matrix.create();
            self.snake.create();
            for (var i = 0; i < self.numFruit; i++)
                self.setFruit();
        };

        self.delete = function () {
            self.$container.children().remove();
        };

        self.start = function () {
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
                self.setPoison();
            }, self.config.speadSnake);
        };

        self.gameOver = function () {

            var name = [];

            $.post('/server/ajax.php', {action: "name"}, function (data) {
                for (var i in data) {
                    name[i] = data[i].name;
                }
                $("input[name=" + self.config.idInputName + "]").autocomplete({ source: name });
            }, "json");

            //console.log(self.name);


            if (self.status) {
                self.status = false;
                $('#' + self.config.idBtnStart).show().html('New game');
                self.pause = false;
                clearInterval(self.intervalMove);
                $('.' + self.config.classAlert).dialog({
                        modal: true,
                        width: 387,
                        height: 435,
                        buttons: {
                            "Send record": function () {
                                var inpt = $("input[name=" + self.config.idInputName + "]").val();
                                $("input[name=" + self.config.idInputName + "]").val("");
                                var json = {name: inpt, score: self.snake.body.length, time: self.time};
                                if (inpt) {
                                    $.post('/server/ajax.php', json);
                                    $(this).dialog('close');
                                }
                            }

                        },
                        close: function () {
                            $("." + self.config.classGameOver).show(10);
                            $("#" + self.config.idBtnViewRecord).show(10);
                        }
                    }
                );
            }
        }
        ;

        self.keyDown = function (event) {
            switch (event.keyCode) {
                case 32://Space
                    if (self.snake.status)
                        self.pause = !self.pause;
                    break;

                case 37://Left
                    //self.snake.course.x != 1
                    if (self.snake.course.x != 1) {
                        self.snake.course = {x: -1, y: 0};
                    }
                    break;
                case 38://Up
                    if (self.snake.course.y != 1) {
                        self.snake.course = {x: 0, y: -1};
                    }
                    break;
                case 39://Right
                    if (self.snake.course.x != -1) {
                        self.snake.course = {x: 1, y: 0};
                    }
                    break;
                case 40://Down
                    if (self.snake.course.y != -1) {
                        self.snake.course = {x: 0, y: 1};
                    }
                    break;
            }
        };

        self.setFruit = function () {
            self.matrix.setCellClass(getNewPosition(), self.config.classFruit);
            $('span.' + self.config.classScore).html(self.snake.body.length);
        };

        self.setPoison = function () {
            if (getRandom(1, 10000) % getRandom(1, 10000) == 0 && self.config.poison) {
                self.matrix.setCellClass(getNewPosition(), self.config.classPoison);
            }
        };

        var getNewPosition = function () {
            var position = {x: getRandom(1, self.config.NumCol), y: getRandom(1, self.config.NumRow)};
            while (self.matrix.checkCellClass(position, self.config.classSnake)
            || self.matrix.checkCellClass(position, self.config.classFruit)
            || self.matrix.checkCellClass(position, self.config.classPoison)) {
                position = {
                    x: getRandom(1, self.config.NumCol),
                    y: getRandom(1, self.config.NumRow)
                };
            }
            return position;
        };

        $(document).keydown(function (e) {
            self.keyDown(e);
        });

        self.constructor();
    }
    ;