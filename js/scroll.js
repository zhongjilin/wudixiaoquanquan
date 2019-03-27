$(document).ready((function(){
    var h3_height = $("#hh").offset().top;
    $(window).scroll(function(){
        var this_scrollTop = $(this).scrollTop();
        if(this_scrollTop>h3_height ){
            $("#dd").show();
        }
    });

}))