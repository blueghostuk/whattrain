var Platform = (function () {
    function Platform(name, segments) {
        if (segments === void 0) { segments = []; }
        this.name = name;
        this.segments = segments;
    }
    Platform.prototype.addSegment = function (name, berth) {
        this.segments.push(new PlatformSegment("" + this.name + name, berth));
    };
    return Platform;
})();
