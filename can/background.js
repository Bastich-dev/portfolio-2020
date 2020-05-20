// start the main loop when ready
let color_indicator = 1
let color_1 = 255
let color_2 = 0
let color_3 = 0

requestAnimationFrame(mainLoop);
var can = document.getElementById("canvas");
// get the canvas context
const ctx = can.getContext("2d");


// set up mouse
document.addEventListener("mousemove", mEvent);
function mEvent(e) { mouse.x = e.pageX; mouse.y = e.pageY }
const mouse = { x: 0, y: 0 };
// create gardient


// requestAnimationFrame callback function
function mainLoop() {
    // resize canvas if needed
    if (can.width !== innerWidth || can.height !== innerHeight) {
        can.width = innerWidth; // resize canvas if 
        can.height = innerHeight; // window resized

    }
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
    grad.addColorStop(0, "rgb(" + color_1 + "," + color_2 + "," + color_3 + ")");
    grad.addColorStop(1, "transparent");

    if (color_1 >= 255) color_indicator = 1
    if (color_2 >= 255) color_indicator = 2
    if (color_3 >= 255) color_indicator = 0

    if (color_indicator == 0) {
        color_1 += 1
        color_3 -= 1
        color_2 -= 1
    }
    if (color_indicator == 1) {
        color_1 -= 1
        color_3 -= 1
        color_2 += 1
    }
    if (color_indicator == 2) {
        color_1 -= 1
        color_3 += 1
        color_2 -= 1
    }

    if (color_1 < 0) color_1 = 0
    if (color_2 < 0) color_2 = 0
    if (color_3 < 0) color_3 = 0



    // set canvas origin to the mouse coords (moves the gradient)
    ctx.setTransform(1.5, 0, 0, 1.5, mouse.x, mouse.y);
    ctx.fillStyle = grad;
    ctx.fillRect(-mouse.x, -mouse.y, can.width, can.height);



    requestAnimationFrame(mainLoop);

}

function fadeOut() {
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, can.width, can.height);
    setTimeout(fadeOut, 100);
}

fadeOut();