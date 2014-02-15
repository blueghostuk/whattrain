var webApi;
$(function () {
    webApi = new TrainNotifier.WebApi();

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
                    $(self).html(berth.m_Item2);
                    webApi.getTrainMovementLink(berth.m_Item2, "WVH", $(self).data("platform")).done(function (link) {
                        var date = moment(link.OriginDepartTimestamp);
                        $(self).click(function () {
                            window.open("http://www.trainnotifier.co.uk/trains/" + link.TrainUid + "/" + date.format(TrainNotifier.DateTimeFormats.dateUrlFormat));
                        });
                    });
                } else {
                    $(self).html("");
                    $(self).click(function () {
                        return;
                    });
                }
            });
        }
    });
}
//# sourceMappingURL=app.js.map
