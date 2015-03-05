var TrainNotifier;
(function (TrainNotifier) {
    var WebApi = (function () {
        function WebApi(serverSettings) {
            this.serverSettings = serverSettings;
            if (!serverSettings) {
                this.serverSettings = TrainNotifier.Common.serverSettings;
            }
        }
        WebApi.prototype.getBaseUrl = function () {
            return "http://" + this.serverSettings.apiUrl;
        };
        WebApi.prototype.getArgs = function () {
            return {
                returnTiplocs: !this.serverSettings.useLocalStorage,
                apiName: this.serverSettings.apiName
            };
        };
        WebApi.prototype.getTiplocs = function () {
            if (this.serverSettings.useLocalStorage) {
                var stations = localStorage.getItem(WebApi.tiplocsLocalStorageKey);
                if (stations) {
                    return $.Deferred().resolve(JSON.parse(stations)).promise();
                }
                else {
                    return $.getJSON(this.getBaseUrl() + "/Stanox/", this.getArgs()).done(function (stations) {
                        localStorage.setItem(WebApi.tiplocsLocalStorageKey, JSON.stringify(stations));
                        return $.Deferred().resolve(stations).promise();
                    });
                }
            }
            return $.getJSON(this.getBaseUrl() + "/Station/", this.getArgs());
        };
        WebApi.prototype.getStations = function () {
            return this.getTiplocs();
        };
        WebApi.prototype.getTrainMovementResult = function (results) {
            if (this.serverSettings.useLocalStorage) {
                return $.when(this.getStations(), results).then(function (stations, trainMovementResults) {
                    var trainMovement = trainMovementResults[0];
                    trainMovement.Tiplocs = stations;
                    return $.Deferred().resolve(trainMovement).promise();
                });
            }
            else {
                return results;
            }
        };
        WebApi.prototype.getTrainMovementByUid = function (uid, date) {
            return this.getTrainMovementResult($.getJSON(this.getBaseUrl() + "/TrainMovement/Uid/" + uid + "/" + date, this.getArgs()));
        };
        WebApi.prototype.getBerthContents = function (berth) {
            return $.getJSON(this.getBaseUrl() + "/Td/Berth/" + berth, this.getArgs());
        };
        WebApi.tiplocsLocalStorageKey = "wt-tiplocs";
        return WebApi;
    })();
    TrainNotifier.WebApi = WebApi;
})(TrainNotifier || (TrainNotifier = {}));
var TrainNotifier;
(function (TrainNotifier) {
    (function (EventType) {
        EventType[EventType["Departure"] = 1] = "Departure";
        EventType[EventType["Arrival"] = 2] = "Arrival";
    })(TrainNotifier.EventType || (TrainNotifier.EventType = {}));
    var EventType = TrainNotifier.EventType;
    var CancellationCodes = (function () {
        function CancellationCodes() {
        }
        CancellationCodes.EnRoute = "EN ROUTE";
        return CancellationCodes;
    })();
    TrainNotifier.CancellationCodes = CancellationCodes;
    var StationTiplocHelper = (function () {
        function StationTiplocHelper() {
        }
        StationTiplocHelper.findStationTiplocs = function (stanoxCode, tiplocs) {
            return tiplocs.filter(function (element) {
                return element.Stanox == stanoxCode;
            });
        };
        StationTiplocHelper.findStationTiploc = function (stanoxCode, tiplocs) {
            var results = StationTiplocHelper.findStationTiplocs(stanoxCode, tiplocs);
            if (results && results.length > 0)
                return results[0];
            return null;
        };
        StationTiplocHelper.tiplocDisplayName = function (tiploc) {
            return tiploc != null ? tiploc.StationName != null ? tiploc.StationName : tiploc.Description : "Unknown";
        };
        return StationTiplocHelper;
    })();
    TrainNotifier.StationTiplocHelper = StationTiplocHelper;
})(TrainNotifier || (TrainNotifier = {}));
