"use strict";
var Matrix = function ($container, $mainContainer, config) {
    var self = this;

    var template = new EJS({url: "view/matrix.ejs"});

    self.$container = $container;
    self.$mainContainer = $mainContainer;

    self.config = config;

    var col = self.config.NumCol,
        row = self.config.NumRow;

    self.create = function () {
        var container = {
            width: col * 19 + 1,
            height: row * 19 + 1
        };
        self.$mainContainer.css({
            width: container.width + parseInt(self.$container.css('margin')) * 2
        });

        self.$container.css(container);

        var matrix = template.render({
            rows: row,
            cols: col
        });

        self.$container.html(matrix);

        //for (var y = 1; y <= row; y++) {
        //    for (var x = 1; x <= col; x++) {
        //        self.$container.append(
        //            $('<div>').addClass('cell-' + x + '-' + y)
        //        );
        //    }
        //}
    };

    self.setCellClass = function (position, cls) {
        getCell(position).addClass(cls);
    };

    self.checkCellClass = function (position, cls) {
        var cell = getCell(position);
        return !cell.length || cell.hasClass(cls);
    };

    self.clearCell = function (position, cls) {
        getCell(position).removeClass(cls);
    };

    function getCell(position) {
        return self.$container.find(".cell-" + position.x + "-" + position.y);
    }
};