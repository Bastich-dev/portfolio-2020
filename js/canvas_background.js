var dd = document.getElementById("canvas_background");
var cv = dd.getContext("2d");
var w = dd.width = document.getElementById('contact').offsetWidth;
var h = dd.height = document.getElementById('contact').offsetHeight
document.getElementById("canvas_hex").appendChild(dd);
function rRInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function polygon(x, y, ns, s) {
    this.shape = new Path2D();
    this.shape.moveTo(x + s * Math.cos(0), y + s * Math.sin(0));
    for (var i = 1; i <= ns; i++) {
        this.shape.lineTo(x + s * Math.cos(i * 2 * Math.PI / ns), y + s * Math.sin(i * 2 * Math.PI / ns));
    }
    return this.shape;
}
function draw() {
    cv.clearRect(0, 0, w, h);
    // var lg = cv.createLinearGradient(0, 40, 40, 0);
    // lg.addColorStop(0, 'rgba( 255, 250, 200, 0.2 )');
    // lg.addColorStop(1, 'rgba( 255, 250, 200, 0.1 )');
    cv.fillStyle = 'rgba( 34, 46, 58, 1 )';
    cv.strokeStyle = 'rgba( 34, 46, 58, 1 )';
    cv.lineWidth = 2;
    var grid = {
        mesh: [],
        shapeSize: 20,
        shapeSides: 6,
        shapeApothem: 15 * Math.cos(Math.PI / 6),
        shapeSideLength: 1 * Math.sin(Math.PI / 6)
    };
    var mc = 0;
    for (var c = 0; c < w / (grid.shapeSize + grid.shapeSideLength); c++) {
        for (var d = 0; d < (h + grid.shapeSize) / (grid.shapeSize * 2); d++) {
            var ty = (d * grid.shapeSize * 2) + ((c % 2) * (grid.shapeSize));
            var tx = c * (grid.shapeSize + grid.shapeApothem);
            grid.mesh.push(new polygon(tx, ty, 6, grid.shapeSize));
            cv.fill(grid.mesh[mc]);
            cv.stroke(grid.mesh[mc]);
            mc++;
            //console.log(c);
        }
    }
}
var reset = function () {
    w = dd.width = document.getElementById('contact').offsetWidth;
    h = dd.height = document.getElementById('contact').offsetHeight
    draw();
}
draw();
//dd.addEventListener("click", draw);
window.addEventListener("resize", reset);


