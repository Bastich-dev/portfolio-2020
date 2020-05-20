// start the main loop when ready
let color_indicator = 1
let color_1 = 255
let color_2 = 0
let color_3 = 0


requestAnimationFrame(mainLoop);
var can = document.getElementById("canvas");
// get the canvas context
const ctx = can.getContext("2d");
can.width = document.getElementById('contact').offsetWidth
can.height = document.getElementById('contact').offsetHeight + 100
ctx.fillStyle = "rgba(0,0,0,1)";
ctx.fillRect(0, 0, can.width, can.height);

// set up mouse
document.addEventListener("mousemove", mEvent);
function mEvent(e) {
    // console.log('1 ' + e.layerY);
    // console.log('2 ' + e.clientY);
    // console.log('3 ' + e.screenY);
    // console.log('4 ' + e.offsetY);
    // console.log('5 ' + e.y);

    // console.log(e.pageY - document.getElementById('portfolio').offsetHeight - document.getElementById('ideas').offsetHeight - document.getElementById('second').offsetHeight - document.getElementById('triangle-top').offsetHeight - document.getElementById('about').offsetHeight)

    mouse.x = e.pageX; mouse.y = e.pageY - document.getElementById('portfolio').offsetHeight - document.getElementById('ideas').offsetHeight - document.getElementById('second').offsetHeight - document.getElementById('triangle-top').offsetHeight - document.getElementById('about').offsetHeight
}
const mouse = { x: 0, y: 0 };
// create gardient


window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {


    can.width = document.getElementById('second').offsetWidth;
    can.height = document.getElementById('contact').offsetHeight + 100


    //camera.aspect = width, height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

}

// requestAnimationFrame callback function
function mainLoop() {
    // resize canvas if needed
    // can.width = document.getElementById('portfolio').offsetWidth;
    // can.height = document.getElementById('portfolio').offsetHeight + document.getElementById('ideas').offsetHeight + document.getElementById('triangle-top').offsetHeight * 1.37;
    // ctx.fillStyle = "rgba(0,0,0,1)";
    // ctx.fillRect(0, 0, can.width, can.height);


    const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 50);
    grad.addColorStop(0, "rgba(" + color_1 + "," + color_2 + "," + color_3 + ",1)");
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
    ctx.setTransform(2.5, 0, 0, 2.5, mouse.x, mouse.y);
    ctx.fillStyle = grad;
    ctx.fillRect(-mouse.x, -mouse.y, can.width, can.height);



    requestAnimationFrame(mainLoop);

}

function fadeOut() {
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, can.width, can.height);
    setTimeout(fadeOut, 100);
}

fadeOut();