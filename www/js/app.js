var main = new Main(config);

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
        main.jsonRecord = data;
    }, "json");
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

main.init();

$("#" + config.idBtnStart).click(function () {
    main.clickBtnStart();
});

$("#" + config.idBtnStartAgain).click(function () {
    main.clickBtnStartAgain();
});

$("#" + config.idBtnSetting).click(function () {
    main.clickBtnSetting();
});

$("#" + config.idBtnViewRecord).click(function () {
    main.clickBtnViewRecord();
});

$("#" + config.idBtnBack).click(function () {
    main.clickBtnBack();
});

$(config.tagOrderBy).click(function () {
    main.clickTagOrderBy(this);
});