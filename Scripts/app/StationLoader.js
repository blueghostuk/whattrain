var StationLoader = (function () {
    function StationLoader() {
    }
    StationLoader.loadStation = function (station) {
        $.when(this.updateData(station)).always(function () {
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
                    promises.push(StationLoader.getBerthContents(station.crsCode, segment).getData());
                }
            }
        }
        return $.when.apply($, promises).always(function () { return $(".fa.fa-refresh").addClass("hide"); });
    };
    StationLoader.getBerthContents = function (crsCode, segment) {
        var obj = {
            crsCode: crsCode,
            segment: segment,
            getData: function () {
                return webApi.getBerthContents(segment.berth).then(function (berthData) {
                    if (berthData) {
                        if (berthData.m_Item2)
                            segment.train.id(berthData.m_Item2);
                        if (berthData.m_Item3) {
                            var ts = moment(berthData.m_Item3.OriginDepartTimestamp).format(TrainNotifier.DateTimeFormats.dateQueryFormat);
                            return webApi.getTrainMovementByUid(berthData.m_Item3.TrainUid, ts).done(function (train) {
                                if (train != null) {
                                    StationLoader.showTrainMovement(train, obj.segment);
                                }
                                else {
                                    obj.segment.train.reset();
                                    if (berthData.m_Item2)
                                        obj.segment.train.id(berthData.m_Item2);
                                }
                            }).fail(function () {
                                obj.segment.train.reset();
                                if (berthData.m_Item2)
                                    obj.segment.train.id(berthData.m_Item2);
                                return $.Deferred().resolve();
                            });
                        }
                        else if (berthData.m_Item2) {
                            return webApi.getTrainMovementLink(berthData.m_Item2, obj.crsCode, obj.segment.platform).done(function (link) {
                                if (link != null) {
                                    var ts = moment(link.OriginDepartTimestamp).format(TrainNotifier.DateTimeFormats.dateQueryFormat);
                                    return webApi.getTrainMovementByUid(link.TrainUid, ts).done(function (train) {
                                        StationLoader.showTrainMovement(train, obj.segment);
                                    });
                                }
                                else {
                                    obj.segment.train.reset();
                                    obj.segment.train.id(berthData.m_Item2);
                                }
                            }).fail(function () {
                                obj.segment.train.reset();
                                obj.segment.train.id(berthData.m_Item2);
                                return $.Deferred().resolve();
                            });
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
    StationLoader.showTrainMovement = function (train, segment) {
        segment.train.operator(train.Movement.Schedule.AtocCode.Name);
        var mostRecentStop = train.Movement.Actual.Stops[train.Movement.Actual.Stops.length - 1];
        if (mostRecentStop != null) {
        }
        var scheduleFirst = train.Movement.Schedule.Stops[0];
        var scheduleLast = train.Movement.Schedule.Stops[train.Movement.Schedule.Stops.length - 1];
        var origin = TrainNotifier.StationTiplocHelper.findStationTiploc(scheduleFirst.TiplocStanoxCode, train.Tiplocs);
        segment.train.from(TrainNotifier.StationTiplocHelper.tiplocDisplayName(origin));
        var dest = TrainNotifier.StationTiplocHelper.findStationTiploc(scheduleLast.TiplocStanoxCode, train.Tiplocs);
        segment.train.to(TrainNotifier.StationTiplocHelper.tiplocDisplayName(dest));
        var arrival = train.Movement.Actual.Stops[train.Movement.Actual.Stops.length - 1];
        segment.train.arrival(moment(arrival.ActualTimestamp).format(TrainNotifier.DateTimeFormats.timeFormat));
    };
    return StationLoader;
})();
