var PlatformSegment = (function () {
    function PlatformSegment(name, berth) {
        this.name = name;
        this.berth = berth;
        this.train = new Train();
    }
    return PlatformSegment;
})();
