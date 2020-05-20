$('.hex-btn-color').hover(() => {
    $('.hex-btn-back').show()
    $('.hex-btn-back').css({ 'transform': 'scale(1.3, 1.5)', }).fadeOut(200, function () {
        $('.hex-btn-back').css({ 'transform': 'scale(1, 1)', })
        $('.hex-btn-back').hide()
    });

})