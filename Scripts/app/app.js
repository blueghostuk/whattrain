var webApi;
$(function () {
    webApi = new TrainNotifier.WebApi();
    $(".berth").click(function () {
        var uid = $(this).data("uid");
        var date = $(this).data("date");
        if (uid && uid.length > 0 && date && date.length > 0) {
            var dateTs = moment(date);
            window.open("http://www.trainnotifier.co.uk/train/#!" + uid + "/" + dateTs.format(TrainNotifier.DateTimeFormats.dateQueryFormat));
        }
    });
    $(document).ajaxStart(function () {
        $(".loading").show();
    });
    $(document).ajaxComplete(function () {
        $(".loading").hide();
    });
    $(".berth").each(function () {
        $(this).text("");
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
            webApi.getBerthContents($(self).data("berth")).done(function (berthData) {
                if (berthData) {
                    if (berthData.m_Item3) {
                        $(self).data("uid", berthData.m_Item3.TrainUid);
                        $(self).data("date", berthData.m_Item3.OriginDepartTimestamp);
                    }
                    else {
                        $(self).text(berthData.m_Item2);
                    }
                }
                else {
                    $(self).text("");
                }
            }).fail(function () {
                $(self).text("");
            });
        }
        else {
            $(self).text("");
        }
    });
}
//# sourceMappingURL=app.js.map