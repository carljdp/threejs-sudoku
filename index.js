
import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL'


// if ( WEBGL.isWebGLAvailable() ) {
//   // Initiate function or other initializations here
// } else {
//   const warning = WEBGL.getWebGLErrorMessage();
//   document.getElementById( 'container' ).appendChild( warning );
// }

// // Create a canvas
// const canvas = document.createElement('canvas')
// canvas.id = 'canvas'
// document.body.appendChild(canvas); // adds the canvas to the body element

// Get a ref to the canvas
// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.domElement.id = "canvas"
document.body.appendChild( renderer.domElement );

// Scene
const scene = new THREE.Scene();

// Camera
const fov = 75;
const aspect = 2;  // 2 (canvas default)
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;

// Light
const color = 0xFFFFFF
const intensity = 1
const light = new THREE.DirectionalLight(color, intensity)
scene.add(light)
light.position.set(-1, 2, 4)

// Geometry (only verticies | like a blueprint | class | component)
const width = 1;
const height = 1;
const depth = 1;
const boxGeometry = new THREE.BoxGeometry(width, height, depth);

// Mesh references (Geometry + material)
const cubes = [
  makeInstance(boxGeometry, 0x44aa88,  0),
  makeInstance(boxGeometry, 0x8844aa, -1.6),
  makeInstance(boxGeometry, 0xaa8844,  1.6),
];


renderLoop(); // ..forever


//=========================================================
// Functions

function renderLoop(DOMHighResTimeStamp) {
  const elapsedSeconds = (DOMHighResTimeStamp - window.previousRenderTimestamp || 0) * 0.001
  window.previousRenderTimestamp = DOMHighResTimeStamp
  const fps = Math.round(1/elapsedSeconds)
  //console.log(`Animation FPS: ${fps}`)
  

  // check if canvas changed
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  // rotate cubes
  const time = DOMHighResTimeStamp * 0.001
  cubes.forEach((cube, index) => {
    const speed = 1 + index * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });


  renderer.render( scene, camera );

  const callbackListUid = window.requestAnimationFrame(renderLoop);
  //if assigned to a var - can be cancled later with cancelAnimanimationFrame
}


function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({color});

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x;

  return cube;
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}