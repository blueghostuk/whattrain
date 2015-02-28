
var webApi: IWebApi;

$(function () {
    webApi = new TrainNotifier.WebApi();

    $(".berth").click(function () {
        var uid: string = $(this).data("uid");
        var date: string = $(this).data("date");

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
        var berth: string = $(self).data("berth");
        if (berth && berth.length > 0) {
            webApi.getBerthContents($(self).data("berth")).done(function (berthData: BerthContents) {
                if (berthData && berthData.m_Item3) {
                    $(self).data("uid", berthData.m_Item3.TrainUid);
                    $(self).data("date", berthData.m_Item3.OriginDepartTimestamp);
                }
                $(self).text(berthData.m_Item2);
            }).fail(function () {
                $(self).text("");
            });
        } else {
            $(self).text("");
        }
    });
}