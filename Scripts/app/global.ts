interface ServerSettings {
    apiUrl: string;
    apiName: string;
    useLocalStorage?: boolean;
}

module TrainNotifier {

    export class Common {

        static serverSettings: ServerSettings;
        static webApi: IWebApi;

        static stationCode: string;

        static trimNullableString(str: string) {
            if (str)
                return str.trim();
            return null;
        }

        static coalesce(str: string[]) {
            for (var i = 0; i < str.length; i++) {
                var trimmed = Common.trimNullableString(str[i]);
                if (trimmed && trimmed.length > 0) {
                    return trimmed;
                }
            }
            return null;
        }
    }
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
        public static timeFrameHours = 0.75;

        public static formatTimeString(time: string): string {
            if (time) {
                var timeMoment = moment(time, TrainNotifier.DateTimeFormats.timeFormat);
                return DateTimeFormats.formatTimeMoment(timeMoment);
            }
            return null;
        }

        public static formatDateTimeString(dateTime: string, format: string = TrainNotifier.DateTimeFormats.shortTimeFormat): string {
            if (dateTime) {
                var timeMoment = moment(dateTime);
                return DateTimeFormats.formatTimeMoment(timeMoment, format);
            }
            return null;
        }

        public static formatTimeDuration(duration: Duration): string {
            if (duration) {
                return DateTimeFormats.padString(duration.hours().toString()) + ":" + DateTimeFormats.padString(duration.minutes().toString());
            }

            return null;
        }

        public static formatTimeMoment(timeMoment: Moment, format: string = TrainNotifier.DateTimeFormats.shortTimeFormat): string {
            if (timeMoment && timeMoment.isValid()) {
                var ts = timeMoment.format(format);
                if (timeMoment.seconds() === 30) {
                    ts += TrainNotifier.CommonStrings.halfMinute;
                }
                return ts;
            }
            return null;
        }

        private static padString(input: string) {
            if (input.length == 0)
                return "00";
            if (input.length == 1)
                return "0" + input;
            return input;
        }

    }

    export class CommonStrings {
        public static halfMinute = "½";
    }

}