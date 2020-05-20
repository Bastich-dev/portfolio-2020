$('.button1').mouseover(() => {
    $('.button').css('transform', 'scale(' + 1.2 + ')');
    $('.button1').css('transform', 'scale(' + 1.1 + ')');
    $('.button2').css('transform', 'scale(' + 1.17 + ')');
}).mouseout(function () {
    $('.button').css('transform', 'scale(' + 1 + ')');
});

