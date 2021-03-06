﻿$(function () {

    var wolverhampton = new Station("Wolverhampton", "WVH");

    var platform1 = new Platform("1");
    platform1.addSegment("", "WO-0082" /*0101*/);

    var platform2 = new Platform("2");
    platform2.addSegment("", "WO-0097" /*0099/0085/0078*/);

    var platform3 = new Platform("3");
    platform3.addSegment("", "WO-0098"/*0073*/);

    var platform4 = new Platform("4");
    platform4.addSegment("", "WO-0105");

    var platform5 = new Platform("5");
    platform5.addSegment("", "WO-0098");

    var platform6 = new Platform("6");
    platform6.addSegment("", "WO-0076");

    wolverhampton.platforms.push(platform1);
    wolverhampton.platforms.push(platform2);
    wolverhampton.platforms.push(platform3);
    wolverhampton.platforms.push(platform4);
    wolverhampton.platforms.push(platform5);
    wolverhampton.platforms.push(platform6);

    StationLoader.loadStation(wolverhampton);
});