function updateBackToTopBtn() {
    var scrollY = $(this).scrollTop();
    if (scrollY > $("#rulesHeader").height() + 400) {
        $('#backToTop').fadeIn();
    } else {
        $('#backToTop').fadeOut();
    }
}

$(document).ready(function() {
    $('#backToTop').css('opacity', '1');
    $('#backToTop').css('display', 'none');
    var scrollY = $(this).scrollTop();
    if (scrollY > $("#rulesHeader").height() + 400){
        updateBackToTopBtn();
    }
});

$(document).scroll(function() {
    updateBackToTopBtn();
});

$("#backToTop").click(function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

