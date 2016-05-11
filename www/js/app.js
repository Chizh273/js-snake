var main = new Main(config);

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

$(config.tagOrderBy).click(function () {
    main.clickTagTheadDiv();
});