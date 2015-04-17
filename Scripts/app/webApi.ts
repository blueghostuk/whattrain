/// <reference path="global.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/moment/moment.d.ts" />

interface IWebApi {

    getTrainMovementLink(headcode: string, crsCode: string, platform: string): JQueryPromise<TrainMovementLink>;

    getTrainMovementByUid(uid: string, date: string): JQueryPromise<SingleTrainMovementResult>;

    getBerthContents(berth: string): JQueryPromise<BerthContents>;
}

interface IEstimate {
    Arrival?: moment.Moment;
    PublicArrival?: moment.Moment;
    Departure?: moment.Moment;
    PublicDeparture?: moment.Moment;
    Pass?: moment.Moment;
    CurrentDelay: number;
}

module TrainNotifier {

    export class WebApi implements IWebApi {

        private static tiplocsLocalStorageKey = "wt-tiplocs";

        constructor(public serverSettings?: ServerSettings) {
            if (!serverSettings) {
                this.serverSettings = TrainNotifier.Common.serverSettings;
            }
        }

        private getBaseUrl() {
            return `http://${this.serverSettings.apiUrl}`;
        }

        private getArgs() {
            return {
                returnTiplocs: !this.serverSettings.useLocalStorage,
                apiName: this.serverSettings.apiName
            };
        }

        private getTiplocs() {
            if (this.serverSettings.useLocalStorage) {
                var stations: string = localStorage.getItem(WebApi.tiplocsLocalStorageKey);
                if (stations) {
                    return $.Deferred().resolve(JSON.parse(stations)).promise();
                } else {
                    return $.getJSON(`${this.getBaseUrl()}/Stanox/`, this.getArgs())
                        .done(function (stations: StationTiploc[]) {
                        localStorage.setItem(WebApi.tiplocsLocalStorageKey, JSON.stringify(stations));
                        return $.Deferred<StationTiploc[]>().resolve(stations).promise();
                    });
                }
            }
            return $.getJSON(`${this.getBaseUrl()}/Station/`, this.getArgs());
        }

        private getStations() {
            return this.getTiplocs();
        }

        private getTrainMovementResult(results: JQueryPromise<SingleTrainMovementResult>): any {
            if (this.serverSettings.useLocalStorage) {
                return $.when(this.getStations(), results).then((stations: StationTiploc[], trainMovementResults) =>{
                    var trainMovement: SingleTrainMovementResult = trainMovementResults[0];
                    trainMovement.Tiplocs = stations;
                    return $.Deferred().resolve(trainMovement).promise();
                });
            } else {
                return results;
            }
        }

        getTrainMovementByUid(uid: string, date: string) {
            return this.getTrainMovementResult($.getJSON(`${this.getBaseUrl()}/TrainMovement/Uid/${uid}/${date}`, this.getArgs()));
        }

        getTrainMovementLink(headcode: string, crsCode: string, platform: string) {
            return $.getJSON(`${this.getBaseUrl() }/TrainMovement/Headcode/${headcode}/${crsCode}/${platform}/`, this.getArgs());
        }

        getBerthContents(berth: string) {
            return $.getJSON(`${this.getBaseUrl()}/Td/Berth/${berth}`, this.getArgs());
        }
    }
}

interface Tiploc {
    Tiploc: string;
    Nalco: string;
    Description: string;
    Stanox: string;
    CRS: string;
}

interface StationTiploc extends Tiploc {
    StationName: string;
    Lat: number;
    Lon: number;
}

interface BerthContents {
    // timestamp
    m_Item1: string;
    // contents
    m_Item2: string;
    m_Item3: BerthTrainDetails;
}

interface BerthTrainDetails {
    // guid
    Id: string;
    // timestamp
    OriginDepartTimestamp: string;
    // uid
    TrainUid: string;
}

module TrainNotifier {

    export enum EventType {
        Departure = 1,
        Arrival = 2
    }

    export class CancellationCodes {
        public static EnRoute = "EN ROUTE";
    }

    export class StationTiplocHelper {
        public static findStationTiplocs(stanoxCode: string, tiplocs: StationTiploc[]) {
            return tiplocs.filter(function (element: StationTiploc) {
                return element.Stanox == stanoxCode;
            });
        }
        public static findStationTiploc(stanoxCode: string, tiplocs: StationTiploc[]) {
            var results = StationTiplocHelper.findStationTiplocs(stanoxCode, tiplocs);
            if (results && results.length > 0)
                return results[0];
            return null;
        }
        public static tiplocDisplayName(tiploc: StationTiploc) {
            return tiploc != null ? tiploc.StationName != null ? tiploc.StationName : tiploc.Description : "Unknown";
        }
    }
}

interface RunningTrainActualStop {
    EventType: TrainNotifier.EventType;
    PlannedTimestamp: string;
    ActualTimestamp?: string;
    Line?: string;
    Platform?: string;
    ScheduleStopNumber: number;
    TiplocStanoxCode: string;
}

interface RunningTrainActual {
    Activated: string;
    TrainId: string;
    HeadCode: string;
    TrainServiceCode: string;
    ScheduleOriginStanoxCode: string;
    OriginDepartTimestamp: string;
    Stops: RunningTrainActualStop[];
}

interface AtocCode {
    Code: string;
    Name: string;
}

interface RunningScheduleTrainStop {
    TiplocStanoxCode: string;
    StopNumber: number;
    Arrival?: string;
    Departure?: string;
    Pass?: string;
    PublicArrival?: string;
    PublicDeparture?: string;
    Line?: string;
    Path?: string;
    Platform?: string;
    EngineeringAllowance?: number;
    PathingAllowance?: number;
    PerformanceAllowance?: number;
    Origin: boolean;
    Intermediate: boolean;
    Terminate: boolean;
}

interface Cancellation {
    CancelledAtStanoxCode: string;
    CancelledTimestamp: string;
    ReasonCode: string;
    Description: string;
    Type: string;
}

interface Reinstatement {
    NewOriginStanoxCode: string;
    PlannedDepartureTime: string;
}

interface ChangeOfOrigin {
    NewOriginStanoxCode: string;
    ReasonCode: string;
    Description: string;
    NewDepartureTime: string;
}

interface RunningScheduleTrain {
    TrainUid: string;
    Headcode: string;
    StartDate: string;
    EndDate: string;
    AtocCode: AtocCode;
    ScheduleStatusId: number;
    Speed?: number;
    Stops: RunningScheduleTrainStop[];
}

interface TrainMovementResult {
    Actual: RunningTrainActual;
    Schedule: RunningScheduleTrain;
    Cancellations: Cancellation[];
    Reinstatements: Reinstatement[];
    ChangeOfOrigins: ChangeOfOrigin[];
}

interface SingleTrainMovementResult {
    Movement: TrainMovementResult;
    Tiplocs: StationTiploc[];
}

interface TrainMovementLink {
    TrainUid: string;
    OriginDepartTimestamp: string;
}