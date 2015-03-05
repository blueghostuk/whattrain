$(function () {

    var euston = new Station("London Euston", "EUS");

    var platform1 = new Platform("1");
    platform1.addSegment("", "WY-X001");
    platform1.addSegment("", "WY-B001");
    platform1.addSegment("", "WY-A001");

    var platform2 = new Platform("2");
    platform2.addSegment("", "WY-X002");
    platform2.addSegment("", "WY-B002");
    platform2.addSegment("", "WY-A002");

    var platform3 = new Platform("3");
    platform3.addSegment("", "WY-X003");
    platform3.addSegment("", "WY-B003");
    platform3.addSegment("", "WY-A003");

    var platform4 = new Platform("4");
    platform4.addSegment("", "WY-X004");
    platform4.addSegment("", "WY-B004");
    platform4.addSegment("", "WY-A004");

    var platform5 = new Platform("5");
    platform5.addSegment("", "WY-X005");
    platform5.addSegment("", "WY-B005");
    platform5.addSegment("", "WY-A005");

    var platform6 = new Platform("6");
    platform6.addSegment("", "WY-X006");
    platform6.addSegment("", "WY-B006");
    platform6.addSegment("", "WY-A006");

    var platform7 = new Platform("7");
    platform7.addSegment("", "WY-X007");
    platform7.addSegment("", "WY-B007");
    platform7.addSegment("", "WY-A007");

    var platform8 = new Platform("8");
    platform8.addSegment("", "WY-X008");
    platform8.addSegment("", "WY-B008");
    platform8.addSegment("", "WY-A008");

    var platform9 = new Platform("9");
    platform9.addSegment("", "WY-X009");
    platform9.addSegment("", "WY-C009");
    platform9.addSegment("", "WY-B009");
    platform9.addSegment("", "WY-A009");

    var platform10 = new Platform("10");
    platform10.addSegment("", "WY-X010");
    platform10.addSegment("", "WY-C010");
    platform10.addSegment("", "WY-B010");
    platform10.addSegment("", "WY-A010");

    var platform11 = new Platform("11");
    platform11.addSegment("", "WY-X011");
    platform11.addSegment("", "WY-C011");
    platform11.addSegment("", "WY-B011");
    platform11.addSegment("", "WY-A011");

    var platform12 = new Platform("12");
    platform12.addSegment("", "WY-X012");
    platform12.addSegment("", "WY-B012");
    platform12.addSegment("", "WY-A012");

    var platform13 = new Platform("13");
    platform13.addSegment("", "WY-X013");
    platform13.addSegment("", "WY-B013");
    platform13.addSegment("", "WY-A013");

    var platform14 = new Platform("14");
    platform14.addSegment("", "WY-X014");
    platform14.addSegment("", "WY-B014");
    platform14.addSegment("", "WY-A014");

    var platform15 = new Platform("15");
    platform15.addSegment("", "WY-X015");
    platform15.addSegment("", "WY-B015");
    platform15.addSegment("", "WY-A015");

    var platform16 = new Platform("16");
    platform16.addSegment("", "WY-X016");
    platform16.addSegment("", "WY-B016");
    platform16.addSegment("", "WY-A016");

    var platform17 = new Platform("17");
    platform17.addSegment("", "WY-X017");
    platform17.addSegment("", "WY-B017");
    platform17.addSegment("", "WY-A017");

    var platform18 = new Platform("18");
    platform18.addSegment("", "WY-X018");
    platform18.addSegment("", "WY-B018");
    platform18.addSegment("", "WY-A018");

    euston.platforms.push(platform1);
    euston.platforms.push(platform2);
    euston.platforms.push(platform3);
    euston.platforms.push(platform4);
    euston.platforms.push(platform5);
    euston.platforms.push(platform6);
    euston.platforms.push(platform7);
    euston.platforms.push(platform8);
    euston.platforms.push(platform9);
    euston.platforms.push(platform10);
    euston.platforms.push(platform11);
    euston.platforms.push(platform12);
    euston.platforms.push(platform13);
    euston.platforms.push(platform14);
    euston.platforms.push(platform15);
    euston.platforms.push(platform16);
    euston.platforms.push(platform17);
    euston.platforms.push(platform18);

    StationLoader.loadStation(euston);
});  