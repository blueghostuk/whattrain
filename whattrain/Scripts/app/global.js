var TrainNotifier;
(function (TrainNotifier) {
    var DateTimeFormats = (function () {
        function DateTimeFormats() {
        }
        DateTimeFormats.formatTimeString = function (time) {
            if (time) {
                var timeMoment = moment(time, TrainNotifier.DateTimeFormats.timeFormat);
                return DateTimeFormats.formatTimeMoment(timeMoment);
            }
            return null;
        };

        DateTimeFormats.formatDateTimeString = function (dateTime) {
            if (dateTime) {
                var timeMoment = moment(dateTime);
                return DateTimeFormats.formatTimeMoment(timeMoment);
            }
            return null;
        };

        DateTimeFormats.formatTimeMoment = function (timeMoment) {
            if (timeMoment && timeMoment.isValid()) {
                var ts = timeMoment.format(TrainNotifier.DateTimeFormats.shortTimeFormat);
                if (timeMoment.seconds() === 30) {
                    ts += TrainNotifier.CommonStrings.halfMinute;
                }
                return ts;
            }
            return null;
        };
        DateTimeFormats.timeUrlFormat = "HH-mm";
        DateTimeFormats.timeFormat = "HH:mm:ss";
        DateTimeFormats.shortTimeFormat = "HH:mm";
        DateTimeFormats.dateFormat = "DD/MM/YY";
        DateTimeFormats.dateTimeFormat = "DD/MM/YY HH:mm:ss";
        DateTimeFormats.dateTimeHashFormat = "YYYY-MM-DD/HH-mm";
        DateTimeFormats.dateQueryFormat = "YYYY-MM-DD";
        DateTimeFormats.dateUrlFormat = "YYYY/MM/DD";
        DateTimeFormats.dateTitleFormat = "ddd Do MMM YYYY";
        DateTimeFormats.dateTimeApiFormat = "YYYY-MM-DDTHH:mm";
        DateTimeFormats.timeFrameMinutesBefore = 15;
        DateTimeFormats.timeFrameHours = 1;
        return DateTimeFormats;
    })();
    TrainNotifier.DateTimeFormats = DateTimeFormats;

    var CommonStrings = (function () {
        function CommonStrings() {
        }
        CommonStrings.halfMinute = "�";
        return CommonStrings;
    })();
    TrainNotifier.CommonStrings = CommonStrings;
})(TrainNotifier || (TrainNotifier = {}));
//# sourceMappingURL=global.js.map
