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
    contents: KnockoutObservable<IBerthContents>;
}

interface IBerthIdentifer {
    name: string;
    areaId: string;
    toString(): string;
}

interface IBerthContentsExtended extends IBerthContents {
    toString: KnockoutComputed<string>;
    update(parent: IBerthContents);
}

module WhatTrain.Models {

    export class Station implements IStation {
        constructor(public name: string, public platforms: Array<IPlatform>) { }
    }

    export class Platform implements IPlatform {
        constructor(public name: string, public sections: Array<IPlatformSection>) { }
    }

    export class PlatformSection implements IPlatformSection {

        public contents = ko.observable<IBerthContents>();

        constructor(public name: string, public size: number, public display = true, public berth?: IBerthIdentifer) { }
    }

    export class BerthContentsExtended implements IBerthContentsExtended {

        // timestamp
        public m_Item1: string;

        public m_Item2: string;

        public toString: KnockoutComputed<string>;

        constructor(parent?: IBerthContents) {
            this.update(parent);

            var self = this;

            this.toString = ko.computed(function () {
                if (self.m_Item1 && self.m_Item2) {
                    return self.m_Item2;
                }
                return "";
            });
        }

        update(parent: IBerthContents) {
            if (parent) {
                this.m_Item1 = parent.m_Item1;
                this.m_Item2 = parent.m_Item2;
            } else {
                this.m_Item1 = null;
                this.m_Item2 = null;
            }
        }
    }

    export class BerthIdentifier implements IBerthIdentifer {
        constructor(public areaId: string, public name: string) { }

        toString(): string {
            return this.areaId + '-' + this.name;
        }
    }

}