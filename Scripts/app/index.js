$(function () {
    $("#stationSelect").change(function () {
        if ($(this).val().length > 0) {
            document.location.href = "/" + $(this).val();
        }
    });
});
