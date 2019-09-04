$(document).ready(function () {
    ma5menu({
        position: 'left',
        closeOnBodyClick: true
    });

    $(".main-img-select").click (function (){
        $(".main-img img").attr('src', $(this).find("img").attr('src'));
    });

    $('.mdb-select').material_select();

    $("#ex13").slider({
        ticks: [609, 889, 1169, 1449, 1729],
        ticks_labels: ['$609', '$889', '$1169', '$1449', '$1729'],
        ticks_snap_bounds: 30,
        range: true,
    });
    
});