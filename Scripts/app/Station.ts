
class Station {

    public get segments() {
        var segments: PlatformSegment[] = [];
        for (var i = 0; i < this.platforms.length; i++) {
            for (var j = 0; j < this.platforms[i].segments.length; j++) {
                segments.push(this.platforms[i].segments[j]);
            }
        }
        return segments;
    }

    constructor(public name: string, public crsCode: string, public platforms: Platform[] = []) { }

    public addPlatform(name: string, segments?: PlatformSegment[]) {
        this.platforms.push(new Platform(name, segments));
    }
}