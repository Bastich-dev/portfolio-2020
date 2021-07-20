/**
 * Textures
 */

const renderer = new THREE.WebGLRenderer({});
const scene = new THREE.Scene();

let width = document.getElementById("three").offsetWidth;
let height = document.getElementById("three").offsetHeight;

let swap = true;

const camera = new THREE.PerspectiveCamera(50, width / height, 1, 5090);
camera.position.y = -5;
camera.position.x = -50;
scene.add(camera);

renderer.setSize(width, height);
document.getElementById("three").appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var light = new THREE.PointLight(0xffffff, 7, 100);
light.position.x = -40;
light.position.z = 10;
scene.add(light);

// const sunLight = new THREE.DirectionalLight(0xffffff, 2.3)
// sunLight.position.x = -50
// sunLight.position.y = 20

// scene.add(sunLight)

let loader = new THREE.GLTFLoader();
loader.load(
    "https://www.bastien-chantrel.fr/projets_demo/vinyl/Vinyl.gltf",
    function (gltf) {
        scene.add(gltf.scene);
    }
);

controls.autoRotate = true;
controls.autoRotateSpeed = -1;

// scene.background = new THREE.Color(0x000000);
animate();

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
    width = document.getElementById("three").offsetWidth;
    height = document.getElementById("three").offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

// document.addEventListener('scroll', function (e) {
//     e.preventDefault()
//     if (window.scrollY >= document.getElementById('three').offsetHeight) {
//         if (swap == true) {
//             cancelAnimationFrame(animate);
//             swap = false
//         }
//     }
//     else {
//         if (swap == false) {
//             requestAnimationFrame(animate);
//             swap = true
//         }
//     }
// })

function animate() {
    // if (swap == true) requestAnimationFrame(animate);

    console.log(camera.position);

    if (camera.position.z >= 25) controls.autoRotateSpeed = 1;
    if (camera.position.z <= -10) controls.autoRotateSpeed = -1;
    camera.updateMatrixWorld();

    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
