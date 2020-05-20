
import { leap as frame } from './leap.js'









let world;
const dt = 1 / 60

// To be synced
let meshes = [];
let bodies = [];

initCannon()

/**
 * Textures
 */

// Instantiate a texture loader
const textureLoader = new THREE.TextureLoader();

// Create the texture
const groundColorTexture = new THREE.TextureLoader().load('./assets/textures/ground.jpg');
groundColorTexture.wrapS = THREE.RepeatWrapping;
groundColorTexture.wrapT = THREE.RepeatWrapping;
groundColorTexture.repeat.x = 20;
groundColorTexture.repeat.y = 20;

const wallColorTexture = new THREE.TextureLoader().load('./assets/textures/wall.jpg');
wallColorTexture.wrapS = THREE.RepeatWrapping;
wallColorTexture.wrapT = THREE.RepeatWrapping;
wallColorTexture.repeat.x = 10;
wallColorTexture.repeat.y = 10;

const tntTexture = new THREE.TextureLoader().load('./assets/textures/tnt.jpg');
const ironCubeColorTexture = new THREE.TextureLoader().load('./assets/textures/ironCube.png');
const goldCubeColorTexture = new THREE.TextureLoader().load('./assets/textures/goldCube.png');
const diamondCubeColorTexture = new THREE.TextureLoader().load('./assets/textures/diamondCube.png');
/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () => {
    // Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) => {
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.set(15, 4, 0); // z , y , x 
camera.quaternion.setFromAxisAngle(
    new THREE.Vector3(0, 1, 0), Math.PI / 2
);

scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMapEnabled = true;
//renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x8ed2ff, 1);
//renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

/**
 * Orbit controls
 */
const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.zoomSpeed = 1

/**
 * Lights
 */
scene.add(new THREE.AmbientLight(0x666666));

const light = new THREE.DirectionalLight(0xffffff, 1.25);
const d = 20;

light.position.set(d, d, d);

light.castShadow = true;
//light.shadowCameraVisible = true;

light.shadowMapWidth = 1024;
light.shadowMapHeight = 1024;

light.shadowCameraLeft = -d;
light.shadowCameraRight = d;
light.shadowCameraTop = d;
light.shadowCameraBottom = -d;

light.shadowCameraFar = 3 * d;
light.shadowCameraNear = d;
light.shadowDarkness = 0.5;

scene.add(light);

/**
 * Element
 */

let interface_posx = 15
let interface_posz = -4

const menuGeometry = new THREE.BoxGeometry(10, 0.3, 20)
const menuMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
});
const menu = new THREE.Mesh(menuGeometry, menuMaterial)
menu.position.x = 10 - interface_posx // deplace vers toi
menu.position.z = - 3.7 - interface_posz // deplace a droite
menu.position.y = 5
menu.rotation.z = - Math.PI / 2 // rotate le cube
scene.add(menu)
const sphereMenuGeometry = new THREE.SphereGeometry(1.5, 10, 10)
const sphereMenuMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xff5612)
})
const sphereMenu = new THREE.Mesh(sphereMenuGeometry, sphereMenuMaterial)
sphereMenu.position.x = 10 - interface_posx // deplace vers toi
sphereMenu.position.z = +0.5 - interface_posz // deplace a droite
sphereMenu.position.y = 8
scene.add(sphereMenu)
const cubeMenuGeometry = new THREE.BoxGeometry(1, 3, 3)
const cubeMenuMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xff5612)
})
const cubeMenu = new THREE.Mesh(cubeMenuGeometry, cubeMenuMaterial)
cubeMenu.position.x = 10 - interface_posx // deplace vers toi
cubeMenu.position.z = - 3.7 - interface_posz // deplace a droite
cubeMenu.position.y = 8
scene.add(cubeMenu)

/// TEXTURE BUTTONS
const cubeRGBGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
//const cubeRGBMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color(0xff5369)})

let colors = []

const cubeR = new THREE.Mesh(cubeRGBGeometry, new THREE.MeshBasicMaterial({ map: ironCubeColorTexture }))
cubeR.position.x = 10 - interface_posx // deplace vers toi
cubeR.position.z = 4 - interface_posz // deplace a droite
cubeR.position.y = 2

colors.push(cubeR)

const cubeG = new THREE.Mesh(cubeRGBGeometry, new THREE.MeshBasicMaterial({ map: goldCubeColorTexture }))
cubeG.position.x = 10 - interface_posx // deplace vers toi
cubeG.position.z = 1 - interface_posz // deplace a droite
cubeG.position.y = 2

colors.push(cubeG)

const cubeB = new THREE.Mesh(cubeRGBGeometry, new THREE.MeshBasicMaterial({ map: diamondCubeColorTexture }))
cubeB.position.x = 10 - interface_posx // deplace vers toi
cubeB.position.z = -2 - interface_posz // deplace a droite
cubeB.position.y = 2

colors.push(cubeB)



// BOUTONS RGB

let activate_colors = [false, false, false]
for (let i = 0; i < 3; i++) { scene.add(colors[i]) }









//  MAIN MATERIALS
const geometry = new THREE.SphereGeometry(0.1, 32, 32)
const material = new THREE.MeshLambertMaterial({ color: 0xff00000 })
const material2 = new THREE.MeshLambertMaterial({ color: 0x0000ff })

// Tableaux mains

let tips = []
let dips = []
let pips = []
let mcps = []
let carps = []

// 'Points' de la main 1 
for (let i = 0; i < 5; i++) {
    const ball_1 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x00ff00 })); tips.push(ball_1)
    const ball_2 = new THREE.Mesh(geometry, material); dips.push(ball_2)
    const ball_3 = new THREE.Mesh(geometry, material); pips.push(ball_3)
    const ball_4 = new THREE.Mesh(geometry, material); mcps.push(ball_4)
    const ball_5 = new THREE.Mesh(geometry, material); carps.push(ball_5)

}

// 'Points' de la main 2
for (let i = 0; i < 5; i++) {
    const ball_1 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x00ff00 })); tips.push(ball_1)
    const ball_2 = new THREE.Mesh(geometry, material2); dips.push(ball_2)
    const ball_3 = new THREE.Mesh(geometry, material2); pips.push(ball_3)
    const ball_4 = new THREE.Mesh(geometry, material2); mcps.push(ball_4)
    const ball_5 = new THREE.Mesh(geometry, material2); carps.push(ball_5)

}


// ajouter touts les 'points' à la scene 
for (let i = 0; i < 10; i++) {
    scene.add(tips[i])
    scene.add(dips[i])
    scene.add(pips[i])
    scene.add(mcps[i])
    scene.add(carps[i])
}




// Plane
const planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);

const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x777777,
    map: groundColorTexture
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
plane.castShadow = true;
plane.receiveShadow = true;
scene.add(plane);

const roomGeometry = new THREE.BoxGeometry(100, 50, 100, 1, 1, 1);

const roomMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: wallColorTexture
});

const room = new THREE.Mesh(roomGeometry, roomMaterial);
room.receiveShadow = true;
scene.add(room)


// Cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 20, 10);
const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0xBDBBB6,
    map: ironCubeColorTexture
});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;
meshes.push(cube);
scene.add(cube);

for (let i = 0; i < 10; i++) {
    const cube_2 = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2, 20, 1), new THREE.MeshPhongMaterial({
        map: tntTexture
    }))
    cube_2.castShadow = true;
    meshes.push(cube_2);
    scene.add(cube_2);

}

function initCannon() {
    // Setup world
    world = new CANNON.World();

    world.gravity.set(0, -20, 0);
    //world.broadphase = new CANNON.NaiveBroadphase();

    // Create boxes invisible
    let mass = 20
    let radius = 1.3

    const boxShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
    const boxBody = new CANNON.Body({
        mass: mass
    });

    boxBody.addShape(boxShape);
    // physique Position cube x,y,z
    boxBody.position.set(3, 10, 0);
    world.add(boxBody);
    bodies.push(boxBody)

    for (let i = 0; i < 10; i++) {
        const boxShape_2 = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
        const boxBody_2 = new CANNON.Body({
            mass: 1
        });



        if (i == 9) boxBody_2.position.set(-15, 16, 0)
        else if (i >= 9) boxBody_2.position.set(-15, 14, 4 + 21 - i * 2.5)
        else if (i >= 7) boxBody_2.position.set(-15, 10, 4 + 15 - i * 2.5)
        else if (i >= 4) boxBody_2.position.set(-15, 6, 4 + 9 - i * 2.5)
        else if (i >= 0) boxBody_2.position.set(-15, 2, 4 - i * 2.5)

        boxBody_2.addShape(boxShape_2);
        world.add(boxBody_2);
        bodies.push(boxBody_2)

    }

    // Create a plane who take a gravity
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({
        mass: 0
    });

    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.add(groundBody);
}


function updatePhysic() {
    world.step(dt)

    for (let i = 0; i !== meshes.length; i++) {
        meshes[i].position.copy(bodies[i].position);
        meshes[i].quaternion.copy(bodies[i].quaternion);
    }
}



/**************************************************************************************************************************************************
 * Loop
 ***************************************************************************************************************************************************/

let hand1;
let hand2;

//Variables pour éviter bugs sur le grab
let time_grab_hand1 = 1
let time_grab_hand2 = 1


const music = document.querySelector('#music')
let played = false



let active_circle = false
let active_menu = true
let active_swipe = false
let activate_cube = false


setTimeout(() => {

    if (frame == undefined) {
        active_menu = false
        alert('Le leap motion est nécessaire pour bénéficier de cette éxperience \n Vous pouvez cliquer et vous déplacer dans la scène')
    }
}, 5500)



setTimeout(() => {
    document.querySelector(".presentation-control").style.display = "none"

    const loop = () => {
        window.requestAnimationFrame(loop)

        controls.update()

        if (active_menu == true) {
            menu.position.y += 0.7
            sphereMenu.position.y += 0.7
            cubeMenu.position.y += 0.7
            colors[0].position.y += 0.7
            colors[1].position.y += 0.7
            colors[2].position.y += 0.7
            if (menu.position.y >= 5) {
                menu.position.y = 5
                sphereMenu.position.y = 8
                cubeMenu.position.y = 8
                colors[0].position.y = 2
                colors[1].position.y = 2
                colors[2].position.y = 2
            }
        }
        if (active_menu == false) {
            menu.position.y -= 0.7
            sphereMenu.position.y -= 0.7
            cubeMenu.position.y -= 0.7
            colors[0].position.y -= 0.7
            colors[1].position.y -= 0.7
            colors[2].position.y -= 0.7
            if (menu.position.y <= -6) {
                menu.position.y = -6
                sphereMenu.position.y = -3
                cubeMenu.position.y = -3
                colors[0].position.y = -9
                colors[1].position.y = -9
                colors[2].position.y = -9
            }
        }


        interface_posx = 5

        if (frame && frame.hands && frame.hands.length > 0) {



            // hand 1 = first hands who enter in zone
            hand1 = frame.hands[0];


            // FORM BUTTON MANAGER
            // if (
            //     (tips[1].position.x < cubeMenu.position.x + 3)
            //     && (tips[1].position.x > cubeMenu.position.x - 3)
            //     && (tips[1].position.y + 1 < cubeMenu.position.y + 1)
            //     && (tips[1].position.y + 1 > cubeMenu.position.y - 1)
            //     && (tips[1].position.z < cubeMenu.position.z + 1)
            //     && (tips[1].position.z > cubeMenu.position.z - 1)
            // ) {
            //     if (activate_cube == false) {
            //         console.log(bodies[0].shapes[0])
            //         activate_cube = true
            //         meshes[0].geometry = new THREE.SphereGeometry(1, 10, 10)
            //         bodies[0].shapes[0] = new CANNON.Sphere(0.3, 32, 32);
            //         bodies[0].position.y = 3
            //         console.log(bodies[0].shapes[0])

            //         setTimeout(function () { activate_cube = false }, 1000)

            //     }
            // }

            // BUTTONS RGB MANAGER
            for (let i = 0; i < 3; i++) {
                if (
                    (tips[1].position.x < colors[i].position.x + 2)
                    && (tips[1].position.x > colors[i].position.x - 2)
                    && (tips[1].position.y + 1 < colors[i].position.y + 1)
                    && (tips[1].position.y + 1 > colors[i].position.y - 1)
                    && (tips[1].position.z < colors[i].position.z + 1)
                    && (tips[1].position.z > colors[i].position.z - 1)
                ) {
                    if (activate_colors[i] == false) {

                        if (i == 0) meshes[0].material.map = ironCubeColorTexture
                        if (i == 1) meshes[0].material.map = goldCubeColorTexture
                        if (i == 2) meshes[0].material.map = diamondCubeColorTexture

                        setTimeout(function () { activate_colors[i] = false }, 1000)

                    }
                }
            }


            // PLACER LES POINTS DE LA MAIN 1
            for (let i = 0; i < 5; i++) {

                tips[i].position.z = -hand1.fingers[i].tipPosition[0] / 20
                tips[i].position.y = hand1.fingers[i].tipPosition[1] / 20 - 5
                tips[i].position.x = hand1.fingers[i].tipPosition[2] / 20

                pips[i].position.z = -hand1.fingers[i].pipPosition[0] / 20
                pips[i].position.y = hand1.fingers[i].pipPosition[1] / 20 - 5
                pips[i].position.x = hand1.fingers[i].pipPosition[2] / 20

                dips[i].position.z = -hand1.fingers[i].dipPosition[0] / 20
                dips[i].position.y = hand1.fingers[i].dipPosition[1] / 20 - 5
                dips[i].position.x = hand1.fingers[i].dipPosition[2] / 20

                mcps[i].position.z = -hand1.fingers[i].mcpPosition[0] / 20
                mcps[i].position.y = hand1.fingers[i].mcpPosition[1] / 20 - 5
                mcps[i].position.x = hand1.fingers[i].mcpPosition[2] / 20

                carps[i].position.z = - hand1.fingers[i].carpPosition[0] / 20
                carps[i].position.y = hand1.fingers[i].carpPosition[1] / 20 - 5
                carps[i].position.x = hand1.fingers[i].carpPosition[2] / 20
            }

            //Update la variable pour éviter les bugs du grab
            time_grab_hand1 += 1 / 60

            // GRAB MAIN 1
            if (
                (hand1.grabStrength > 0.8)                                                                        // Si la force du grab est supérieur à 0.8
                && (mcps[2].position.z - hand1.palmNormal[0] < bodies[0].position.z + 1 + bodies[0].shapes[0].halfExtents.z / 5)    // Si la POSITION Z du métacarp du majeur de la main 1 est dans la zone de collision du cube ( POSITION Z du cube)
                && (mcps[2].position.z - hand1.palmNormal[0] > bodies[0].position.z - 1 - bodies[0].shapes[0].halfExtents.z / 5)    // Si la POSITION Z du métacarp du majeur de la main 1 est dans la zone de collision du cube ( POSITION Z du cube)
                && (mcps[2].position.y + (hand1.palmNormal[1]) < bodies[0].position.y + 2 + bodies[0].shapes[0].halfExtents.y / 5)  // Si la POSITION Y du métacarp du majeur de la main 1 est dans la zone de collision du cube ( POSITION Y du cube)
                && (mcps[2].position.y + (hand1.palmNormal[1]) > bodies[0].position.y - 2 - bodies[0].shapes[0].halfExtents.y / 5)   // Si la POSITION Y du métacarp du majeur de la main 1 est dans la zone de collision du cube ( POSITION Y du cube)
                && (mcps[2].position.x + 2 < bodies[0].position.x + 1 + bodies[0].shapes[0].halfExtents.x / 5)                                   // Si la POSITION X du métacarp du majeur de la main 1 est dans la zone de collision du cube ( POSITION X du cube)
                && (mcps[2].position.x + 2 > bodies[0].position.x - 1 - bodies[0].shapes[0].halfExtents.x / 5)                                    // Si la POSITION X du métacarp du majeur de la main 1 est dans la zone de collision du cube ( POSITION X du cube)


            ) {
                time_grab_hand1 = 0; // Pour éviter le bug GRAB
            }
            if (time_grab_hand1 < 0.05) {

                // SET les positions du cube dans la main 1
                bodies[0].position.x = mcps[2].position.x + 2
                bodies[0].position.y = mcps[2].position.y + (hand1.palmNormal[1])
                bodies[0].position.z = mcps[2].position.z - hand1.palmNormal[0]


                // Si un mouvement de la main 1 brusque est détecté, ajoute de la vélocité au cube
                if (hand1.palmVelocity[0] < -100) {
                    bodies[0].velocity.x = -25
                    bodies[0].velocity.y = 12
                }


                // Rotate le cube BIEN au centre de la main peu importe la position de la main 1
                let axis = new CANNON.Vec3(1, 0, 0);
                let angle = 0

                if (hand1.palmNormal[1] < 0) { // Si la main est orienté en haut
                    axis = new CANNON.Vec3(1, 0, 0);
                    angle = -(Math.PI / 2) * - hand1.palmNormal[0]
                }
                else {  // Si la main est orienté en bas
                    axis = new CANNON.Vec3(1, 0, 0);
                    angle = (Math.PI / 2) * - hand1.palmNormal[0]
                }
                bodies[0].quaternion.setFromAxisAngle(axis, angle);


            }


            // SI UNE SECONDE MAIN ENTRE DANS LA ZONE DU LEAP
            if (frame && frame.hands && frame.hands.length > 1) {
                // hand 2 = second hand who enter in zone
                hand2 = frame.hands[1];

                // PLACER LES POINTS DE LA MAIN 2
                for (let i = 0; i < 5; i++) {

                    tips[i + 5].position.z = -hand2.fingers[i].tipPosition[0] / 20
                    tips[i + 5].position.y = hand2.fingers[i].tipPosition[1] / 20 - 5
                    tips[i + 5].position.x = hand2.fingers[i].tipPosition[2] / 20

                    pips[i + 5].position.z = -hand2.fingers[i].pipPosition[0] / 20
                    pips[i + 5].position.y = hand2.fingers[i].pipPosition[1] / 20 - 5
                    pips[i + 5].position.x = hand2.fingers[i].pipPosition[2] / 20

                    dips[i + 5].position.z = -hand2.fingers[i].dipPosition[0] / 20
                    dips[i + 5].position.y = hand2.fingers[i].dipPosition[1] / 20 - 5
                    dips[i + 5].position.x = hand2.fingers[i].dipPosition[2] / 20

                    mcps[i + 5].position.z = -hand2.fingers[i].mcpPosition[0] / 20
                    mcps[i + 5].position.y = hand2.fingers[i].mcpPosition[1] / 20 - 5
                    mcps[i + 5].position.x = hand2.fingers[i].mcpPosition[2] / 20

                    carps[i + 5].position.z = - hand2.fingers[i].carpPosition[0] / 20
                    carps[i + 5].position.y = hand2.fingers[i].carpPosition[1] / 20 - 5
                    carps[i + 5].position.x = hand2.fingers[i].carpPosition[2] / 20


                }
                //Update la variable pour éviter les bugs du grab
                time_grab_hand2 += 1 / 60

                // GRAB MAIN 2
                if (
                    (hand2.grabStrength > 0.8)                                                                        // Si la force du grab est supérieur à 0.8
                    && (mcps[7].position.z - hand2.palmNormal[0] < bodies[0].position.z + 1 + bodies[0].shapes[0].halfExtents.z / 5)   // Si la POSITION Z du métacarp du majeur de la main 2 est dans la zone de collision du cube ( POSITION Z du cube)
                    && (mcps[7].position.z - hand2.palmNormal[0] > bodies[0].position.z - 1 - bodies[0].shapes[0].halfExtents.z / 5)   // Si la POSITION Z du métacarp du majeur de la main 2 est dans la zone de collision du cube ( POSITION Z du cube)
                    && (mcps[7].position.y + (hand2.palmNormal[1]) < bodies[0].position.y + 2 + bodies[0].shapes[0].halfExtents.y / 5)// Si la POSITION Y du métacarp du majeur de la main 2 est dans la zone de collision du cube ( POSITION Y du cube)
                    && (mcps[7].position.y + (hand2.palmNormal[1]) > bodies[0].position.y - 2 - bodies[0].shapes[0].halfExtents.y / 5)// Si la POSITION Y du métacarp du majeur de la main 2 est dans la zone de collision du cube ( POSITION Y du cube)
                    && (mcps[7].position.x + 2 < bodies[0].position.x + 1 + bodies[0].shapes[0].halfExtents.x / 5)                                 // Si la POSITION X du métacarp du majeur de la main 2 est dans la zone de collision du cube ( POSITION X du cube)
                    && (mcps[7].position.x + 2 > bodies[0].position.x - 1 - bodies[0].shapes[0].halfExtents.x / 5)                                 // Si la POSITION X du métacarp du majeur de la main 2 est dans la zone de collision du cube ( POSITION X du cube)
                ) {
                    time_grab_hand2 = 0// Pour éviter le bug GRAB 
                }
                if (time_grab_hand2 < 0.05) {


                    // SET les positions du cube dans la main 2
                    bodies[0].position.x = mcps[7].position.x + 2
                    bodies[0].position.y = mcps[7].position.y + (hand2.palmNormal[1])
                    bodies[0].position.z = mcps[7].position.z - hand2.palmNormal[0]

                    // Si un mouvement de la main 2 brusque est détecté, ajoute de la vélocité au cube
                    if (hand2.palmVelocity[0] < -100) {
                        bodies[0].velocity.x = -15
                        bodies[0].velocity.y = 6

                    }

                    // Rotate le cube BIEN au centre de la main peu importe la position de la main 2
                    let axis = new CANNON.Vec3(1, 0, 0);
                    let angle = 0

                    if (hand1.palmNormal[1] < 0) {// Si la main est orienté en haut
                        axis = new CANNON.Vec3(1, 0, 0);
                        angle = -(Math.PI / 2) * - hand2.palmNormal[0]
                    }
                    else {// Si la main est orienté en bas
                        axis = new CANNON.Vec3(1, 0, 0);
                        angle = (Math.PI / 2) * - hand2.palmNormal[0]
                    }
                    bodies[0].quaternion.setFromAxisAngle(axis, angle);
                }

                // CODE ACTIF POUR LES DEUX MAINS



                ////

            }

            //CODE ACTIF POUR UNE MAIN
            //console.log(frame.gestures)
            ////

            if (frame.gestures.length != 0) {
                let circleCount = 0
                for (let i = 0; i < frame.gestures.length; i++) {
                    if (frame.gestures[i].type == "circle") circleCount++
                    if ((circleCount > 9) && (active_circle == false)) {
                        active_circle = true
        for (let i = 0; i < bodies.length; i++) {


            if (i == 10) { bodies[i].position.x = -15; bodies[i].position.y = 16; bodies[i].position.z = 0 }
            else if (i >= 10) { bodies[i].position.x = -15; bodies[i].position.y = 14; bodies[i].position.z = 4 + 21 - (i - 1) * 2.5 }
            else if (i >= 8) { bodies[i].position.x = -15; bodies[i].position.y = 10; bodies[i].position.z = 4 + 15 - (i - 1) * 2.5 }
            else if (i >= 5) { bodies[i].position.x = -15; bodies[i].position.y = 6; bodies[i].position.z = 4 + 9 - (i - 1) * 2.5 }
            else if (i >= 1) { bodies[i].position.x = -15; bodies[i].position.y = 2; bodies[i].position.z = 4 - (i - 1) * 2.5 }
            else if (i == 0) { bodies[i].position.x = 3; bodies[i].position.y = 10; bodies[i].position.z = 0 }





            //default position


            bodies[0].velocity.x = 0
            bodies[0].velocity.y = 0

            //default size
            meshes[0].scale.x = 1
            meshes[0].scale.y = 1
            meshes[0].scale.z = 1

            bodies[0].shapes[0].halfExtents.x = 0.5
            bodies[0].shapes[0].halfExtents.y = 0.5
            bodies[0].shapes[0].halfExtents.z = 0.5

            bodies[0].shapes[0].updateConvexPolyhedronRepresentation()
        }
                        console.log("CIRCLE")
                        setTimeout(function () { active_circle = false }, 500)
                    }
                }
            }

            console.log(frame.gestures)
            if (frame.gestures.length != 0) {
                let swipeCount = 0
                for (let i = 0; i < frame.gestures.length; i++) {
                    if (frame.gestures[i].type == "swipe") swipeCount++
                    if ((swipeCount > 6) && (active_swipe == false)) {
                        active_swipe = true
                        console.log("swipe")
                        active_menu = !active_menu

                        setTimeout(function () { active_swipe = false }, 1000)
                    }
                }
            }

            // PINCH UPDATE TAILLE
            if (frame.hands.length > 1) {                                                // Si il y a les deux mains
                if ((hand1.pinchStrength > 0.6)                                       // Si le PinchStrength de la main 1 est supérieur à 0.8
                    && (hand2.pinchStrength > 0.6)                                  // Si le PinchStrength de la main 2 est supérieur à 0.8
                    && (tips[1].position.x < bodies[0].position.x + 2 + ((tips[1].position.z - tips[6].position.z)) / 20)          // Si la POSITION X du bout du doigt de la main 1 est dans la zone de collision du cube
                    && (tips[1].position.x > bodies[0].position.x - 2 - ((tips[1].position.z - tips[6].position.z)) / 20)          // Si la POSITION X du bout du doigt de la main 1 est dans la zone de collision du cube
                    && (tips[1].position.y + 1 < bodies[0].position.y + 2 + ((tips[1].position.z - tips[6].position.z)) / 20)     // Si la POSITION Y du bout du doigt de la main 1 est dans la zone de collision du cube
                    && (tips[1].position.y + 1 > bodies[0].position.y - 2 - ((tips[1].position.z - tips[6].position.z)) / 20)      // Si la POSITION Y du bout du doigt de la main 1 est dans la zone de collision du cube
                    && (tips[1].position.z < bodies[0].position.z + 2 + ((tips[1].position.z - tips[6].position.z)) / 20)          // Si la POSITION Z du bout du doigt de la main 1 est dans la zone de collision du cube
                    && (tips[1].position.z > bodies[0].position.z - 2 - ((tips[1].position.z - tips[6].position.z)) / 20)          // Si la POSITION Z du bout du doigt de la main 1 est dans la zone de collision du cube
                    && (tips[6].position.x < bodies[0].position.x + 2 + ((tips[1].position.z - tips[6].position.z)) / 20)          // Si la POSITION X du bout du doigt de la main 2 est dans la zone de collision du cube
                    && (tips[6].position.x > bodies[0].position.x - 2 - ((tips[1].position.z - tips[6].position.z)) / 20)          // Si la POSITION X du bout du doigt de la main 2 est dans la zone de collision du cube
                    && (tips[6].position.y + 1 < bodies[0].position.y + 2 + ((tips[1].position.z - tips[6].position.z)) / 20)     // Si la POSITION Y du bout du doigt de la main 2 est dans la zone de collision du cube
                    && (tips[6].position.y + 1 > bodies[0].position.y - 2 - ((tips[1].position.z - tips[6].position.z)) / 20)      // Si la POSITION Y du bout du doigt de la main 2 est dans la zone de collision du cube
                    && (tips[6].position.z < bodies[0].position.z + 2 + ((tips[1].position.z - tips[6].position.z)) / 20)          // Si la POSITION Z du bout du doigt de la main 2 est dans la zone de collision du cube
                    && (tips[6].position.z > bodies[0].position.z - 2 - ((tips[1].position.z - tips[6].position.z)) / 20)          // Si la POSITION Z du bout du doigt de la main 2 est dans la zone de collision du cube
                ) {

                    // Scale le mesh du cube
                    meshes[0].scale.x = (tips[1].position.z - tips[6].position.z) - 0.5
                    meshes[0].scale.y = (tips[1].position.z - tips[6].position.z) - 0.5
                    meshes[0].scale.z = (tips[1].position.z - tips[6].position.z) - 0.5
                    // Scale la zone de collision pour la physique du cube
                    // if (bodies[0].shapes[0].radius) console.log('lol')
                    let ecart = +((tips[1].position.z - tips[6].position.z) - 0.5) / 2
                    if (ecart < 0.0001) ecart = 0.00000001
                    bodies[0].shapes[0].halfExtents.x = ecart
                    bodies[0].shapes[0].halfExtents.y = ecart
                    bodies[0].shapes[0].halfExtents.z = ecart
                    // Update la zone de collision pour la physique du cube
                    bodies[0].shapes[0].updateConvexPolyhedronRepresentation()


                    for (let j = 1; j < 10; j++) {
                        bodies[j].shapes[0].updateConvexPolyhedronRepresentation()
                    }

                    bodies[0].position.y += 0.1


                }


            }

        }





        updatePhysic();




        if (played == false) {
            music.play()
            // music.volume = 2
            played = true
        }
        renderer.render(scene, camera);
    }

    loop()
}, 3000);