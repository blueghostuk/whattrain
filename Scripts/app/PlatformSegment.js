var PlatformSegment = (function () {
    function PlatformSegment(platform, name, berth) {
        this.platform = platform;
        this.name = name;
        this.berth = berth;
        this.train = new Train();
    }
    return PlatformSegment;
})();
