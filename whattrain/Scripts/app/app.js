var webApi;
$(function () {
    webApi = new TrainNotifier.WebApi();

    $(".berth").click(function () {
        var uid = $(this).data("uid");
        var date = $(this).data("date");

        if (uid && uid.length > 0 && date && date.length > 0) {
            var dateTs = moment(date);
            window.open("http://www.trainnotifier.co.uk/trains/" + uid + "/" + dateTs.format(TrainNotifier.DateTimeFormats.dateUrlFormat));
        }
    });

    reloadBerths();
});

function reloadBerths() {
    window.setInterval(loadBerths, 5000);
}

function loadBerths() {
    $(".berth").each(function () {
        var self = this;
        var berth = $(self).data("berth");
        if (berth && berth.length > 0) {
            webApi.getBerthContents($(self).data("berth")).done(function (berth) {
                if (berth) {
                    webApi.getTrainMovementLink(berth.m_Item2, "WVH", $(self).data("platform")).done(function (link) {
                        if (link) {
                            $(self).data("uid", link.TrainUid);
                            $(self).data("date", link.OriginDepartTimestamp);
                        } else {
                            $(self).data("uid", "");
                            $(self).data("date", "");
                        }
                        $(self).html(berth.m_Item2);
                    });
                } else {
                    $(self).html("");
                }
            });
        }
    });
}
//# sourceMappingURL=app.js.map
