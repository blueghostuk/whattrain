var StationLoader = (function () {
    function StationLoader() {
    }
    StationLoader.loadStation = function (station) {
        var _this = this;
        $.when(this.updateData(station)).done(function () {
            ko.applyBindings(station, $("table#station").get(0));
            window.setInterval(_this.updateData, 5000, station);
        });
    };
    StationLoader.updateData = function (station) {
        var webApi = new TrainNotifier.WebApi();
        var promises = [];
        $(".fa.fa-refresh").removeClass("hide");
        for (var i = 0; i < station.platforms.length; i++) {
            var platform = station.platforms[i];
            for (var j = 0; j < platform.segments.length; j++) {
                var segment = platform.segments[j];
                if (segment.berth) {
                    promises.push(webApi.getBerthContents(segment.berth).then(function (berthData) {
                        if (berthData) {
                            if (berthData.m_Item3) {
                                segment.train.reset();
                                segment.train.id(berthData.m_Item2);
                                return webApi.getTrainMovementByUid(berthData.m_Item3.TrainUid, berthData.m_Item3.OriginDepartTimestamp).done(function (train) {
                                    segment.train.operator(train.Movement.Schedule.AtocCode.Name);
                                });
                            }
                            else if (berthData.m_Item2) {
                                segment.train.reset();
                                segment.train.id(berthData.m_Item2);
                            }
                            else {
                                segment.train.reset();
                            }
                        }
                        else {
                            segment.train.reset();
                        }
                    }));
                }
            }
        }
        return $.when(promises).always(function () { return $(".fa.fa-refresh").addClass("hide"); });
    };
    return StationLoader;
})();
