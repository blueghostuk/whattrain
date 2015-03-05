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
        WebApi.tiplocsLocalStorageKey = "tn-tiplocs";
        return WebApi;
    })();
    TrainNotifier.WebApi = WebApi;
})(TrainNotifier || (TrainNotifier = {}));
var TrainNotifier;
(function (TrainNotifier) {
    (function (LiveTrainStopSource) {
        LiveTrainStopSource[LiveTrainStopSource["Trust"] = 0] = "Trust";
        LiveTrainStopSource[LiveTrainStopSource["TD"] = 1] = "TD";
    })(TrainNotifier.LiveTrainStopSource || (TrainNotifier.LiveTrainStopSource = {}));
    var LiveTrainStopSource = TrainNotifier.LiveTrainStopSource;
    (function (EventType) {
        EventType[EventType["Departure"] = 1] = "Departure";
        EventType[EventType["Arrival"] = 2] = "Arrival";
    })(TrainNotifier.EventType || (TrainNotifier.EventType = {}));
    var EventType = TrainNotifier.EventType;
    (function (TrainState) {
        TrainState[TrainState["Activated"] = 1] = "Activated";
        TrainState[TrainState["Cancelled"] = 2] = "Cancelled";
        TrainState[TrainState["ActivatedAndCancelled"] = 3] = "ActivatedAndCancelled";
        TrainState[TrainState["Terminated"] = 4] = "Terminated";
        TrainState[TrainState["ActivatedAndTerminated"] = 5] = "ActivatedAndTerminated";
    })(TrainNotifier.TrainState || (TrainNotifier.TrainState = {}));
    var TrainState = TrainNotifier.TrainState;
    var CancellationCodes = (function () {
        function CancellationCodes() {
        }
        CancellationCodes.EnRoute = "EN ROUTE";
        return CancellationCodes;
    })();
    TrainNotifier.CancellationCodes = CancellationCodes;
    (function (STPIndicatorValue) {
        STPIndicatorValue[STPIndicatorValue["Cancellation"] = 1] = "Cancellation";
        STPIndicatorValue[STPIndicatorValue["STP"] = 2] = "STP";
        STPIndicatorValue[STPIndicatorValue["Overlay"] = 3] = "Overlay";
        STPIndicatorValue[STPIndicatorValue["Permanent"] = 4] = "Permanent";
    })(TrainNotifier.STPIndicatorValue || (TrainNotifier.STPIndicatorValue = {}));
    var STPIndicatorValue = TrainNotifier.STPIndicatorValue;
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
        return StationTiplocHelper;
    })();
    TrainNotifier.StationTiplocHelper = StationTiplocHelper;
})(TrainNotifier || (TrainNotifier = {}));
