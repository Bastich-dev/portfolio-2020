
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
// const globeDiffuseTexture = textureLoader.load(globeDiffuseImageSource)


const renderer = new THREE.WebGLRenderer({});
const scene = new THREE.Scene();

let width = document.getElementById('header').offsetWidth;
let height = document.getElementById('header').offsetHeight;

const camera = new THREE.PerspectiveCamera(50, width / height, 1, 590);

document.addEventListener('mousemove', onDocumentMouseMove, false);

renderer.setSize(width, height);
document.getElementById('header').appendChild(renderer.domElement);


let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(), INTERSECTED;
let radius = 100, theta = 0;

camera.position.x = 50
camera.position.z = 300
camera.position.y = 200
camera.rotation.y = -0.55
camera.rotation.x = -Math.PI / 2
scene.add(camera);

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffcccc, 0.2)
// scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xff0000, 100)
sunLight.position.x = 0
sunLight.position.y = 0
sunLight.position.z = 10
scene.add(sunLight)

// const sunLight2 = new THREE.DirectionalLight(0xffcccc, 1)
// sunLight2.position.x = -10
// sunLight2.position.y = -20
// sunLight2.position.z = 0
// scene.add(sunLight2)

var geometry = new THREE.CylinderGeometry(2, 2, 10, 6);
const material = [
    new THREE.MeshPhongMaterial({ color: 0x4deeea }), // sides
    new THREE.MeshPhongMaterial({ color: 0xf000ff }), // top
    new THREE.MeshPhongMaterial({ color: 0xff0000 }), // bottom
];

let cylinders = []
for (let i = 0; i < 150; i++) {
    for (let j = 0; j < 150; j++) {
        let cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.x = 4 * i
        cylinder.position.z = 4 * j
        cylinder.nb = j + 150 * i
        cylinder.active = false
        cylinders.push(cylinder)
    }
}

for (let i in cylinders) {
    scene.add(cylinders[i])
}


scene.background = new THREE.Color(0x000000);


animate();



function onDocumentMouseMove(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {


    width = document.getElementById('header').offsetWidth;
    height = document.getElementById('header').offsetHeight;


    //camera.aspect = width, height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

}


function animate() {
    requestAnimationFrame(animate);



    camera.updateMatrixWorld();
    // camera.lookAt(scene.position);

    // find intersections

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children);

    let nb = 0;


    if (intersects.length > 0) {


        if (INTERSECTED != intersects[0].object) {

            intersects.forEach((e) => {
                nb = e.object.nb
            })

        }
        else {
            console.log('aiiii')
        }

    } else {

    }



    if (nb != 0) {
        cylinders[nb].position.y = 5

        cylinders[nb - 1].position.y = 4
        cylinders[nb + 1].position.y = 4
        cylinders[nb - 150].position.y = 4
        cylinders[nb + 150].position.y = 4


        cylinders[nb - 149].position.y = 3
        cylinders[nb + 149].position.y = 3
        cylinders[nb - 151].position.y = 3
        cylinders[nb + 151].position.y = 3

        cylinders[nb - 2].position.y = 3
        cylinders[nb + 2].position.y = 3
        cylinders[nb - 300].position.y = 3
        cylinders[nb + 300].position.y = 3

        cylinders[nb].active = true

        cylinders[nb - 1].active = true
        cylinders[nb + 1].active = true
        cylinders[nb - 150].active = true
        cylinders[nb + 150].active = true


        cylinders[nb - 149].active = true
        cylinders[nb + 149].active = true
        cylinders[nb - 151].active = true
        cylinders[nb + 151].active = true

        cylinders[nb - 2].active = true
        cylinders[nb + 2].active = true
        cylinders[nb - 300].active = true
        cylinders[nb + 300].active = true


    }


    for (let i in cylinders) {
        if (cylinders[i].active == true) {
            cylinders[i].position.y -= 0.5

            if (cylinders[i].position.y <= 0) {
                cylinders[i].active = false
                cylinders[i].position.y = 0
            }
        }
    }


    // cylinders[nb + 1].position.y = 2
    // controls.update();

    renderer.render(scene, camera);
}