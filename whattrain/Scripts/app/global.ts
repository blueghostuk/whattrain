interface IServerSettings {
    apiUrl: string;
    wsUrl: string;
    apiName: string;
}

module TrainNotifier {

    export class DateTimeFormats {
        public static timeUrlFormat = "HH-mm";
        public static timeFormat = "HH:mm:ss";
        public static shortTimeFormat = "HH:mm";
        public static dateFormat = "DD/MM/YY";
        public static dateTimeFormat = "DD/MM/YY HH:mm:ss";
        public static dateTimeHashFormat = "YYYY-MM-DD/HH-mm";
        public static dateQueryFormat = "YYYY-MM-DD";
        public static dateUrlFormat = "YYYY/MM/DD";
        public static dateTitleFormat = "ddd Do MMM YYYY";
        public static dateTimeApiFormat = "YYYY-MM-DDTHH:mm";
        public static timeFrameMinutesBefore = 15;
        public static timeFrameHours = 1;

        public static formatTimeString(time: string): string {
            if (time) {
                var timeMoment = moment(time, TrainNotifier.DateTimeFormats.timeFormat);
                return DateTimeFormats.formatTimeMoment(timeMoment);
            }
            return null;
        }

        public static formatDateTimeString(dateTime: string): string {
            if (dateTime) {
                var timeMoment = moment(dateTime);
                return DateTimeFormats.formatTimeMoment(timeMoment);
            }
            return null;
        }

        public static formatTimeMoment(timeMoment: Moment): string {
            if (timeMoment && timeMoment.isValid()) {
                var ts = timeMoment.format(TrainNotifier.DateTimeFormats.shortTimeFormat);
                if (timeMoment.seconds() === 30) {
                    ts += TrainNotifier.CommonStrings.halfMinute;
                }
                return ts;
            }
            return null;
        }
    }

    export class CommonStrings {
        public static halfMinute = "�";
    }

}