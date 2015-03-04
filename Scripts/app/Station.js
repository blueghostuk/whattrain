var Station = (function () {
    function Station(name, platforms) {
        if (platforms === void 0) { platforms = []; }
        this.name = name;
        this.platforms = platforms;
    }
    Object.defineProperty(Station.prototype, "segments", {
        get: function () {
            var segments = [];
            for (var i = 0; i < this.platforms.length; i++) {
                for (var j = 0; j < this.platforms[i].segments.length; j++) {
                    segments.push(this.platforms[i].segments[j]);
                }
            }
            return segments;
        },
        enumerable: true,
        configurable: true
    });
    Station.prototype.addPlatform = function (name, segments) {
        this.platforms.push(new Platform(name, segments));
    };
    return Station;
})();
