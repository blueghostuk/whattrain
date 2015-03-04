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
                    promises.push(this.getBerthContents(segment));
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
                            obj.segment.train.reset();
                            segment.train.id(berthData.m_Item2);
                        }
                        else if (berthData.m_Item2) {
                            obj.segment.train.reset();
                            obj.segment.train.id(berthData.m_Item2);
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
        return obj.getData();
    };
    return StationLoader;
})();
