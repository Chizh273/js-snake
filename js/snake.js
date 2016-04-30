"use strict";
var Snake = function (matrix, config) {
    var self = this;

    self.matrix = matrix;
    self.config = config;

    self.body = [
        {x: 5, y: 2},
        {x: 5, y: 3},
        {x: 5, y: 4}
    ];
    self.course = {x: 0, y: 1};

    self.status = true;
    self.eat = false;

    self.create = function () {
        for (var i = 0; i < self.body.length; i++) {
            self.matrix.setCellClass(self.body[i], config.classSnake);
        }
    };

    self.move = function () {
        var lastBody = self.body[self.body.length - 1];
        var head = {
            x: lastBody.x + self.course.x,
            y: lastBody.y + self.course.y
        };
        if (!self.matrix.checkCellClass(head, self.config.classPoison)
            && !self.matrix.checkCellClass(head, self.config.classSnake)
            && self.status) {
            if (!self.matrix.checkCellClass(head, self.config.classFruit)) {
                var tail = self.body.shift();
                self.matrix.clearCell(tail, self.config.classSnake);
            }
            else {
                self.matrix.clearCell(head, self.config.classFruit);
                self.eat = true;
            }
            self.body.push(head);
            self.matrix.setCellClass(head, self.config.classSnake);
        }
        else {
            self.status = false;
        }
    };
};