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