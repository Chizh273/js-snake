$("#" + config.idBtnViewRecord).click(
    function () {
        $("#" + config.idTableRecord).html(ajaxServer());

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
    }
);