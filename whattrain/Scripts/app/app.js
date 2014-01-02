var webApi;
var currentStation;

$(function () {
    webApi = new TrainNotifier.WebApi();

    var currentStation = stations[0];
    ko.applyBindings(currentStation, $("#station").get(0));
    reloadBerths();
});

function reloadBerths() {
    window.setInterval(loadBerths, 5000);
}

function loadBerths() {
    $(".berth").each(function () {
        var self = this;
        webApi.getBerthContents($(self).data("berth")).done(function (berth) {
            if (ko.contextFor(self).$data.contents()) {
                ko.contextFor(self).$data.contents().update(berth);
            } else {
                ko.contextFor(self).$data.contents(new WhatTrain.Models.BerthContentsExtended(berth));
            }
        });
    });
}
//# sourceMappingURL=app.js.map
