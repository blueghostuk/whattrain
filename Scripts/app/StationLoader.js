var StationLoader = (function () {
    function StationLoader() {
    }
    StationLoader.loadStation = function (station) {
        $.when(this.updateData(station)).done(function () {
            ko.applyBindings(station, $("table#station").get(0));
            window.setInterval(StationLoader.updateData, 5000, station);
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
                    promises.push(StationLoader.getBerthContents(segment).getData());
                }
            }
        }
        return $.when(promises).always(function () { return $(".fa.fa-refresh").addClass("hide"); });
    };
    StationLoader.getBerthContents = function (segment) {
        var obj = {
            segment: segment,
            getData: function () {
                return webApi.getBerthContents(segment.berth).then(function (berthData) {
                    if (berthData) {
                        if (berthData.m_Item3) {
                            segment.train.id(berthData.m_Item2);
                            var ts = moment(berthData.m_Item3.OriginDepartTimestamp).format(TrainNotifier.DateTimeFormats.dateQueryFormat);
                            return webApi.getTrainMovementByUid(berthData.m_Item3.TrainUid, ts).done(function (train) {
                                obj.segment.train.operator(train.Movement.Schedule.AtocCode.Name);
                                var mostRecentStop = train.Movement.Actual.Stops[train.Movement.Actual.Stops.length - 1];
                                if (mostRecentStop != null) {
                                }
                                var scheduleFirst = train.Movement.Schedule.Stops[0];
                                var scheduleLast = train.Movement.Schedule.Stops[train.Movement.Schedule.Stops.length - 1];
                                var origin = TrainNotifier.StationTiplocHelper.findStationTiploc(scheduleFirst.TiplocStanoxCode, train.Tiplocs);
                                obj.segment.train.from(origin.StationName);
                                var dest = TrainNotifier.StationTiplocHelper.findStationTiploc(scheduleLast.TiplocStanoxCode, train.Tiplocs);
                                obj.segment.train.to(dest.StationName);
                            });
                        }
                        else if (berthData.m_Item2) {
                            obj.segment.train.reset(berthData.m_Item2);
                        }
                        else {
                            obj.segment.train.reset();
                        }
                    }
                    else {
                        obj.segment.train.reset();
                    }
                });
            }
        };
        return obj;
    };
    return StationLoader;
})();
