
class Platform {

    constructor(public name: string, public segments: PlatformSegment[] = []) { }

    public addSegment(name: string, berth?: string) {
        this.segments.push(new PlatformSegment(`${this.name}${name}`, berth));
    }
} 