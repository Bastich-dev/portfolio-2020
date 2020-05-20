


const renderer = new THREE.WebGLRenderer({ alpha: true });
const scene = new THREE.Scene();

let width = document.getElementById('contain').offsetWidth;
let height = document.getElementById('contain').offsetHeight;

const camera = new THREE.PerspectiveCamera(50, width / height, 1, 100);


renderer.setSize(width, height);
document.getElementById('contain').appendChild(renderer.domElement);

camera.position.z = 50
camera.position.y = -10
scene.add(camera);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffcccc, 0.2)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xffcccc, 1)
sunLight.position.x = 10
sunLight.position.y = 20
sunLight.position.z = 0
scene.add(sunLight)

const sunLight2 = new THREE.DirectionalLight(0xffcccc, 1)
sunLight2.position.x = -10
sunLight2.position.y = -20
sunLight2.position.z = 0
scene.add(sunLight2)


const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.zoomSpeed = 1


let cubes = []

const cube1 = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10, 10), new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
cube1.position.x = 6
cube1.position.y = 6
cube1.position.z = 6
cubes.push(cube1)

const cube2 = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10, 10), new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
cube2.position.x = -6
cube2.position.y = 6
cube2.position.z = 6
cubes.push(cube2)

const cube3 = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10, 10), new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
cube3.position.x = -6
cube3.position.y = - 6
cube3.position.z = 6
cubes.push(cube3)

const cube4 = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10, 10), new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
cube4.position.x = - 6
cube4.position.y = -6
cube4.position.z = - 6
cubes.push(cube4)

const cube5 = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10, 10), new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
cube5.position.x = 6
cube5.position.y = -6
cube5.position.z = 6
cubes.push(cube5)

const cube6 = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10, 10), new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
cube6.position.x = 6
cube6.position.y = - 6
cube6.position.z = -6
cubes.push(cube6)

const cube7 = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10, 10), new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
cube7.position.x = 6
cube7.position.y = 6
cube7.position.z = -6
cubes.push(cube7)

const cube8 = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10, 10), new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
cube8.position.x = - 6
cube8.position.y = 6
cube8.position.z = -6
cubes.push(cube8)




for (let i = 0; i < 8; i++) {
    scene.add(cubes[i])
}


controls.enabled = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.enableDamping = false;
controls.dampingFactor = 1;

controls.enablePan = false;
controls.enableKeys = false;
controls.enableZoom = false;
let camera_dir = true;

animate();



window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {


    width = document.getElementById('contain').offsetWidth;
    height = document.getElementById('contain').offsetHeight;


    //camera.aspect = width, height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

}

function animate() {
    requestAnimationFrame(animate);
    controls.update()
    if ((camera.position.y < -40) || (camera.position.y > 40)) camera_dir = !camera_dir



    if (camera_dir == true) camera.position.y += 0.2
    if (camera_dir == false) camera.position.y += -0.2

    renderer.setClearColor(0x00ffff, 0);
    renderer.render(scene, camera);
}