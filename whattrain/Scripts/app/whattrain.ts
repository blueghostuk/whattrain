interface IStation {
    name: string;
    platforms: Array<IPlatform>;
}

interface IPlatform {
    name: string;
    sections: Array<IPlatformSection>;
}

interface IPlatformSection {
    name: string;
    size: number;
    display: boolean;
    berth: IBerthIdentifer;
    contents: IBerthContents;
}

interface IBerthIdentifer {
    name: string;
    areaId: string;
    toString(): string;
}

module WhatTrain.Models {

    export class Station implements IStation {
        constructor(public name: string, public platforms: Array<IPlatform>) { }
    }

    export class Platform implements IPlatform {
        constructor(public name: string, public sections: Array<IPlatformSection>) { }
    }

    export class PlatformSection implements IPlatformSection {

        public contents: IBerthContents;

        constructor(public name: string, public size: number, public display = true, public berth?: IBerthIdentifer) { }
    }


    export class BerthIdentifier implements IBerthIdentifer {
        constructor(public areaId: string, public name: string) { }
    }

}