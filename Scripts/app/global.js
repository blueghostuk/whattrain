var TrainNotifier;
(function (TrainNotifier) {
    var Common = (function () {
        function Common() {
        }
        Common.trimNullableString = function (str) {
            if (str)
                return str.trim();
            return null;
        };
        Common.coalesce = function (str) {
            for (var i = 0; i < str.length; i++) {
                var trimmed = Common.trimNullableString(str[i]);
                if (trimmed && trimmed.length > 0) {
                    return trimmed;
                }
            }
            return null;
        };
        return Common;
    })();
    TrainNotifier.Common = Common;
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
        DateTimeFormats.formatDateTimeString = function (dateTime, format) {
            if (format === void 0) { format = TrainNotifier.DateTimeFormats.shortTimeFormat; }
            if (dateTime) {
                var timeMoment = moment(dateTime);
                return DateTimeFormats.formatTimeMoment(timeMoment, format);
            }
            return null;
        };
        DateTimeFormats.formatTimeDuration = function (duration) {
            if (duration) {
                return DateTimeFormats.padString(duration.hours().toString()) + ":" + DateTimeFormats.padString(duration.minutes().toString());
            }
            return null;
        };
        DateTimeFormats.formatTimeMoment = function (timeMoment, format) {
            if (format === void 0) { format = TrainNotifier.DateTimeFormats.shortTimeFormat; }
            if (timeMoment && timeMoment.isValid()) {
                var ts = timeMoment.format(format);
                if (timeMoment.seconds() === 30) {
                    ts += TrainNotifier.CommonStrings.halfMinute;
                }
                return ts;
            }
            return null;
        };
        DateTimeFormats.padString = function (input) {
            if (input.length == 0)
                return "00";
            if (input.length == 1)
                return "0" + input;
            return input;
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
        DateTimeFormats.timeFrameHours = 0.75;
        return DateTimeFormats;
    })();
    TrainNotifier.DateTimeFormats = DateTimeFormats;
    var CommonStrings = (function () {
        function CommonStrings() {
        }
        CommonStrings.halfMinute = "½";
        return CommonStrings;
    })();
    TrainNotifier.CommonStrings = CommonStrings;
})(TrainNotifier || (TrainNotifier = {}));
