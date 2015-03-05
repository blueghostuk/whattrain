$(function () {

    var bhm = new Station("Birmingham New Street", "BHM");

    var platform1 = new Platform("1");
    platform1.addSegment("A", "BN-0181");
    platform1.addSegment("A", "BN-0209");
    platform1.addSegment("M", "BN-0205");
    platform1.addSegment("B", "BN-0149");
    platform1.addSegment("B", "BN-0240");

    var platform2 = new Platform("2");
    platform2.addSegment("A", "BN-0179");
    platform2.addSegment("B", "BN-0233");

    var platform3 = new Platform("3");
    platform3.addSegment("A", "BN-0178");
    platform3.addSegment("B", "BN-0232");

    var platform4 = new Platform("4");
    platform4.addSegment("A", "BN-0177");
    platform4.addSegment("B", "BN-0231");
    platform4.addSegment("C", "BN-0229");

    var platform5 = new Platform("5");
    platform5.addSegment("A", "BN-0176");
    platform5.addSegment("B", "BN-0228");

    var platform6 = new Platform("6");
    platform6.addSegment("A", "BN-0172");
    platform6.addSegment("B", "BN-0225");

    var platform7 = new Platform("7");
    platform7.addSegment("A", "BN-0171");
    platform7.addSegment("B", "BN-0223");

    var platform8 = new Platform("8");
    platform8.addSegment("A", "BN-0167");
    platform8.addSegment("B", "BN-0219");

    var platform9 = new Platform("9");
    platform9.addSegment("A", "BN-0166");
    platform9.addSegment("B", "BN-0217");

    var platform10 = new Platform("10");
    platform10.addSegment("A", "BN-0163");
    platform10.addSegment("B", "BN-0082");

    var platform11 = new Platform("11");
    platform11.addSegment("A", "BN-0161");
    platform11.addSegment("B", "BN-0214");

    var platform12 = new Platform("12");
    platform12.addSegment("A", "BN-0158");
    platform12.addSegment("B", "BN-0212");

    bhm.platforms.push(platform1);
    bhm.platforms.push(platform2);
    bhm.platforms.push(platform3);
    bhm.platforms.push(platform4);
    bhm.platforms.push(platform5);
    bhm.platforms.push(platform6);
    bhm.platforms.push(platform7);
    bhm.platforms.push(platform8);
    bhm.platforms.push(platform9);
    bhm.platforms.push(platform10);
    bhm.platforms.push(platform11);
    bhm.platforms.push(platform12);

    StationLoader.loadStation(bhm);
}); 