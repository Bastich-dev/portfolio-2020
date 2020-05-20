$('.hex-btn-color').hover(() => {
    $('.hex-btn-back').show()
    $('.hex-btn-back').css({ 'transform': 'scale(2.1, 2.3)', }).fadeOut(250, function () {
        $('.hex-btn-back').css({ 'transform': 'scale(1.5)', })
        $('.hex-btn-back').hide()
    });
})