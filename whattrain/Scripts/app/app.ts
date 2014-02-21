
var webApi: IWebApi;

$(function () {
    webApi = new TrainNotifier.WebApi();

    $(".berth").click(function () {
        var uid: string = $(this).data("uid");
        var date: string = $(this).data("date");

        if (uid && uid.length > 0 && date && date.length > 0) {
            var dateTs = moment(date);
            window.open("http://www.trainnotifier.co.uk/trains/" + uid + "/" + dateTs.format(TrainNotifier.DateTimeFormats.dateUrlFormat));
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
            webApi.getBerthContents($(self).data("berth")).done(function (berthData: IBerthContents) {
                if (berthData) {
                    webApi.getTrainMovementLink(berthData.m_Item2, TrainNotifier.Common.stationCode, $(self).data("platform")).done(function (link: ITrainMovementLink) {
                        if (link) {
                            $(self).data("uid", link.TrainUid);
                            $(self).data("date", link.OriginDepartTimestamp);
                        } else {
                            $(self).data("uid", "");
                            $(self).data("date", "");
                        }
                    }).always(function () {
                            $(self).text(berthData.m_Item2);
                        });
                } else {
                    $(self).text("");
                }
            }).fail(function () {
                    $(self).text("");
                });
        }
    });
}