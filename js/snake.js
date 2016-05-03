"use strict";
var Snake = function (matrix, config) {
    var self = this;

    self.matrix = matrix;
    self.config = config;

    self.body = [
        {x: getRandom(1, self.config.NumCol), y: getRandom(1, self.config.NumRow)}
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
        var head = newPosition();
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
    
    var newPosition = function (){
        var lastBody = self.body[self.body.length - 1];
        var x = lastBody.x + self.course.x,
            y = lastBody.y + self.course.y;
        if( !self.config.walls ) {
            if (1 > x) {
                x = self.config.NumCol;
            }
            else if (x > self.config.NumCol) {
                x = 1;
            }
            if (1 > y) {
                y = self.config.NumRow;
            }
            else if (y > self.config.NumRow) {
                y = 1;
            }
        }
        return { x: x, y: y };
    }
};