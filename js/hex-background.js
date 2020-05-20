

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
// const globeDiffuseTexture = textureLoader.load(globeDiffuseImageSource)


const renderer = new THREE.WebGLRenderer({});
const scene = new THREE.Scene();

let width = document.getElementById('second').offsetWidth;
let height = document.getElementById('second').offsetHeight;

const camera = new THREE.PerspectiveCamera(50, width / height, 1, 590);

document.addEventListener('mousemove', onDocumentMouseMove, false);

renderer.setSize(width, height);
document.getElementById('second').appendChild(renderer.domElement);


let raycaster = new THREE.Raycaster();
let mouse2 = new THREE.Vector2(), INTERSECTED;
let radius = 100, theta = 0;



camera.position.x = 30.308441452564523
camera.position.y = 75
camera.position.z = 100

camera.rotation.x = - Math.PI / 2
camera.rotation.y = -0.4
camera.rotation.z = 0

scene.add(camera);


// let controls = new THREE.OrbitControls(camera, renderer.domElement);


// controls.update();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xff0000, 1)
sunLight.position.x = 0
sunLight.position.y = 4
sunLight.position.z = 0
scene.add(sunLight)

// const sunLight2 = new THREE.DirectionalLight(0xffcccc, 1)
// sunLight2.position.x = -10
// sunLight2.position.y = -20
// sunLight2.position.z = 0
// scene.add(sunLight2)

var geometry = new THREE.CylinderGeometry(2, 2, 5, 6);

let sprite = new THREE.TextureLoader().load('../textures/hex2.jpg');

const material = [
    new THREE.MeshPhongMaterial({ color: 0xff0000 }), // sides
    new THREE.MeshPhongMaterial({ color: 0xff0000 }), // top
    new THREE.MeshPhongMaterial({ color: 0xff0000 }), // bottom
];

const material2 = [
    new THREE.MeshPhongMaterial({ color: 0x0000ff }), // sides
    new THREE.MeshPhongMaterial({ color: 0x0000ff }), // top
    new THREE.MeshPhongMaterial({ color: 0x0000ff }), // bottom
];

const material3 = [
    new THREE.MeshPhongMaterial({ map: sprite }), // sides
    new THREE.MeshPhongMaterial({ map: sprite }), // top
    new THREE.MeshPhongMaterial({ map: sprite }), // bottom
];

let letitgo = true
let cylinders = []


for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
        let cylinder = new THREE.Mesh(geometry, material3);
        cylinder.position.x = 4 * i
        cylinder.position.z = 6 * j
        cylinder.nb = j + 50 * i
        cylinder.active = false
        cylinder.line = 1
        cylinders.push(cylinder)
    }
}

for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
        let cylinder = new THREE.Mesh(geometry, material3);
        cylinder.position.x = 2 + 4 * i
        cylinder.position.z = 3 + 6 * j
        cylinder.nb = 2500 + (j + 50 * i)
        cylinder.active = false
        cylinder.line = 2
        cylinders.push(cylinder)
    }
}


for (let i in cylinders) {
    scene.add(cylinders[i])
}


scene.background = new THREE.Color(0x000000);
document.addEventListener('mousemove', onDocumentMouseMove, false);
animate();



function onDocumentMouseMove(event) {

    event.preventDefault();
    // console.log(event)
    mouse2.x = (event.pageX / width) * 2 - 1;
    mouse2.y = - (event.pageY / height) * 2 + 1;

}



window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {


    width = document.getElementById('second').offsetWidth;
    height = document.getElementById('second').offsetHeight;


    //camera.aspect = width, height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

}


function animate() {
    requestAnimationFrame(animate);




    // camera.lookAt(scene.position);
    camera.updateMatrixWorld();
    // find intersections
    // camera.lookAt(scene.position);
    raycaster.setFromCamera(mouse2, camera);


    let intersects = raycaster.intersectObjects(scene.children);


    let nb = 0;


    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            // intersects.forEach((e) => {
            //     nb = e.object.nb
            // })
            nb = intersects[0].object.nb
        }
    }

    let verif = true
    cylinders[5].material = material2
    for (let i = 0; i < 50; i++) {

        if (i == nb) {

            verif = false
        }
        if (5000 - i == nb) {
            verif = false
        }
    }

    if ((nb != 0) && (verif == true)) {
        cylinders[nb].position.y = 4
        cylinders[nb - 50].position.y = 2
        cylinders[nb + 50].position.y = 2

        cylinders[nb].active = true
        cylinders[nb - 50].active = true
        cylinders[nb + 50].active = true

        if (cylinders[nb].line == 1) {
            cylinders[nb + 2500].position.y = 2
            cylinders[nb + 2499].position.y = 2
            cylinders[nb + 2500 - 50].position.y = 2
            cylinders[nb + 2499 - 50].position.y = 2

            cylinders[nb + 2500].active = true
            cylinders[nb + 2499].active = true
            cylinders[nb + 2500 - 50].active = true
            cylinders[nb + 2499 - 50].active = true
        }
        else {
            cylinders[nb - 2500].position.y = 2
            cylinders[nb - 2499].position.y = 2
            cylinders[nb - 2500 + 50].position.y = 2
            cylinders[nb - 2499 + 50].position.y = 2

            cylinders[nb - 2500].active = true
            cylinders[nb - 2499].active = true
            cylinders[nb - 2500 + 50].active = true
            cylinders[nb - 2499 + 50].active = true
        }
    }

    for (let i = 0; i < cylinders.length; i++) {
        if (cylinders[i].active == true) {
            if (cylinders[i].position.y <= 0) {
                cylinders[i].position.y = 0
                cylinders[i].active = true
            }
            else {
                cylinders[i].position.y -= 0.1
            }
        }

    }

    if (letitgo == true) {
        for (let i = 0; i < cylinders.length; i++) {
            cylinders[i].position.x -= 0.1
            if (cylinders[i].position.x <= 0) {
                cylinders[i].position.x = 199.6
            }
        }
    }




    renderer.render(scene, camera);

}



$('#hex-img').on('click', function () {
    $(':root').css('--width', '160px');
    letitgo = !letitgo
    setTimeout(() => {
        $(':root').css('--width', '180px');
    }, 200)
})

