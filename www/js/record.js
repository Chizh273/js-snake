$("#" + config.idBtnViewRecord).click(
    function () {
        var ajaxServer = function () {
            $.post('/server/ajax.php', function (data) {
                var tab = $("table");
                tab.children().remove();
                var html = "<thead> <tr> <td>Name</td> <td>Score</td> <td>Time</td> </tr></thead><tbody>";
                for (var i = 0; i < data.length; i++) {
                    html += "<tr><td>" + data[i].name + "</td>" +
                        "<td>" + data[i].score + "</td><td>" + data[i].time + "</td></tr>";
                }
                html += "</tbody>";
                tab.html(html);
            }, "json");
        };

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