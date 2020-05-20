var can = document.getElementById("canvas"),
    ctx = can.getContext("2d"),
    painting = false,
    lastX = 0,
    lastY = 0;



can.onmousedown = function (e) {
    if (!painting) {
        painting = true;
    } else {
        painting = false;
    }

    lastX = e.pageX
    lastY = e.pageY
};

can.onmousemove = function (e) {

    if (can.width !== innerWidth || can.height !== innerHeight) {
        can.width = innerWidth; // resize can if 
        can.height = innerHeight; // window resized

    }
    if (painting) {
        mouseX = e.pageX
        mouseY = e.pageY

        // ctx.setTransform(2, 0, 0, 2, mouseX, mouseY);
        ctx.fillStyle = 'blue';
        ctx.fillRect(-mouseX, -mouseY, can.width, can.height);

        lastX = mouseX;
        lastY = mouseY;
    }
}

function fadeOut() {
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillRect(0, 0, can.width, can.height);
    setTimeout(fadeOut, 100);
}

fadeOut();