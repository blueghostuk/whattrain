
class StationLoader {

    public static loadStation(station: Station) {
        $.when(this.updateData(station)).done(() => {
            ko.applyBindings(station, $("table#station").get(0));
            window.setInterval(StationLoader.updateData, 5000, station);
        });
    }

    private static updateData(station: Station) {
        var webApi: IWebApi = new TrainNotifier.WebApi();
        var promises: JQueryPromise<any>[] = [];
        $(".fa.fa-refresh").removeClass("hide");
        for (var i = 0; i < station.platforms.length; i++) {
            var platform = station.platforms[i];
            for (var j = 0; j < platform.segments.length; j++) {
                var segment = platform.segments[j];
                if (segment.berth) {
                    promises.push(StationLoader.getBerthContents(segment));
                }
            }
        }

        return $.when(promises).always(() => $(".fa.fa-refresh").addClass("hide"));
    }

    private static getBerthContents(segment: PlatformSegment) {
        var obj = {
            segment: segment,
            getData: () => {
                return webApi.getBerthContents(segment.berth).then((berthData) => {
                    if (berthData) {
                        if (berthData.m_Item3) {
                            obj.segment.train.reset();
                            segment.train.id(berthData.m_Item2);
                            return webApi.getTrainMovementByUid(berthData.m_Item3.TrainUid, ts).done((train) => {
                                segment.train.operator(train.Movement.Schedule.AtocCode.Name);
                            });*/
                        } else if (berthData.m_Item2) {
                            obj.segment.train.reset();
                            obj.segment.train.id(berthData.m_Item2);
                        } else {
                            obj.segment.train.reset();
                        }
                    } else {
                        obj.segment.train.reset();
                    }
                });
            }
        };

        return obj.getData();
    }
} 