$(".btn-hex").hover(() => {
    $(".btn-hex-back").show();
    $(".btn-hex-back")
        .css({ transform: "scale(1.8, 2.2)" })
        .fadeOut(500, function () {
            $(".btn-hex-back").css({ transform: "scale(1)" });
            $(".btn-hex-back").hide();
        });
});

setTimeout(() => {
    $(".btn-hex-back").css({ visibility: "visible" });
}, 2000);

$("#link-mail").on("click", function () {
    $(this).next().css({ visibility: "visible" });
    $(this).next().removeClass("animate__bounceOut");
    $(this).next().addClass("animate__bounceIn");
    const range = document.createRange();
    range.selectNode(this);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");

    setTimeout(() => {
        $(this).next().removeClass("animate__bounceIn");
        $(this).next().addClass("animate__bounceOut");
        window.getSelection().removeAllRanges(); // to deselect
    }, 1500);
});

$(".btn-hey").hover(() => {
    $(".btn-hey-back").show();
    $(".btn-hey-back")
        .css({ transform: "scale(1.8, 2.2)" })
        .fadeOut(500, function () {
            $(".btn-hey-back").css({ transform: "scale(1)" });
            $(".btn-hey-back").hide();
        });
});

setTimeout(() => {
    $(".btn-hey-back").css({ visibility: "visible" });
}, 2000);

$($(".progress_inner .progress_inner__step")[3]).addClass("toggle");

$('input[type="radio"]').bind("change", (e) => {
    const listCircles = $(".progress_inner .progress_inner__step");
    const index = +e.target.id.split("-")[1];
    [
        listCircles[0],
        listCircles[1],
        listCircles[2],
        listCircles[3],
        listCircles[4],
    ].forEach((element, key) => {
        if (key === index - 1) $(element).addClass("toggle");
        else $(element).removeClass("toggle");
    });
});
