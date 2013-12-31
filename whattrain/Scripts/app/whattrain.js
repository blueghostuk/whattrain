var WhatTrain;
(function (WhatTrain) {
    (function (Models) {
        var Station = (function () {
            function Station(name, platforms) {
                this.name = name;
                this.platforms = platforms;
            }
            return Station;
        })();
        Models.Station = Station;

        var Platform = (function () {
            function Platform(name, sections) {
                this.name = name;
                this.sections = sections;
            }
            return Platform;
        })();
        Models.Platform = Platform;

        var PlatformSection = (function () {
            function PlatformSection(name, size, display, berth) {
                if (typeof display === "undefined") { display = true; }
                this.name = name;
                this.size = size;
                this.display = display;
                this.berth = berth;
            }
            return PlatformSection;
        })();
        Models.PlatformSection = PlatformSection;

        var BerthIdentifier = (function () {
            function BerthIdentifier(areaId, name) {
                this.areaId = areaId;
                this.name = name;
            }
            return BerthIdentifier;
        })();
        Models.BerthIdentifier = BerthIdentifier;
    })(WhatTrain.Models || (WhatTrain.Models = {}));
    var Models = WhatTrain.Models;
})(WhatTrain || (WhatTrain = {}));
//# sourceMappingURL=whattrain.js.map
