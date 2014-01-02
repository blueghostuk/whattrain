var stations: Array<IStation> = [];

var areaIds = {
    Wolverhampton: "WO"
};

var wolverhampton = new WhatTrain.Models.Station("Wolverhampton",
    [
        new WhatTrain.Models.Platform(areaIds.Wolverhampton, [
            new WhatTrain.Models.PlatformSection("", 1, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "0259")),
            new WhatTrain.Models.PlatformSection("5", 3, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "0098")),
            new WhatTrain.Models.PlatformSection("Booking Area", 4, false),
            new WhatTrain.Models.PlatformSection("6", 3, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "")),
            new WhatTrain.Models.PlatformSection("", 1, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, ""))
        ]),
        new WhatTrain.Models.Platform("1", [
            new WhatTrain.Models.PlatformSection("", 1, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "0112")),
            new WhatTrain.Models.PlatformSection("1", 10, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "0082")),
            new WhatTrain.Models.PlatformSection("", 1, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "0062"))
        ]),
        new WhatTrain.Models.Platform("2", [
            new WhatTrain.Models.PlatformSection("", 1, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "0099")),
            new WhatTrain.Models.PlatformSection("2", 10, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "0085")),
            new WhatTrain.Models.PlatformSection("", 1, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "X085"))
        ]),
        new WhatTrain.Models.Platform("3", [
            new WhatTrain.Models.PlatformSection("", 1, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "0259")),
            new WhatTrain.Models.PlatformSection("3", 10, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "0097")),
            new WhatTrain.Models.PlatformSection("", 1, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "X097"))
        ]),
        new WhatTrain.Models.Platform("4", [
            new WhatTrain.Models.PlatformSection("", 1, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "0259")),
            new WhatTrain.Models.PlatformSection("4", 10, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "0105")),
            new WhatTrain.Models.PlatformSection("", 1, true, new WhatTrain.Models.BerthIdentifier(areaIds.Wolverhampton, "0063"))
        ])
    ]);

stations.push(wolverhampton);