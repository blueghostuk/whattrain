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
                this.contents = ko.observable();
            }
            return PlatformSection;
        })();
        Models.PlatformSection = PlatformSection;

        var BerthContentsExtended = (function () {
            function BerthContentsExtended(parent) {
                this.update(parent);

                var self = this;

                this.toString = ko.computed(function () {
                    if (self.m_Item1 && self.m_Item2) {
                        return self.m_Item2;
                    }
                    return "";
                });
            }
            BerthContentsExtended.prototype.update = function (parent) {
                if (parent) {
                    this.m_Item1 = parent.m_Item1;
                    this.m_Item2 = parent.m_Item2;
                } else {
                    this.m_Item1 = null;
                    this.m_Item2 = null;
                }
            };
            return BerthContentsExtended;
        })();
        Models.BerthContentsExtended = BerthContentsExtended;

        var BerthIdentifier = (function () {
            function BerthIdentifier(areaId, name) {
                this.areaId = areaId;
                this.name = name;
            }
            BerthIdentifier.prototype.toString = function () {
                return this.areaId + '-' + this.name;
            };
            return BerthIdentifier;
        })();
        Models.BerthIdentifier = BerthIdentifier;
    })(WhatTrain.Models || (WhatTrain.Models = {}));
    var Models = WhatTrain.Models;
})(WhatTrain || (WhatTrain = {}));
//# sourceMappingURL=whattrain.js.map
