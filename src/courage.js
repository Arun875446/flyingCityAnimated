// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as CANNON from "cannon-es";
// import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import GUI from "lil-gui";
// const canvas = document.querySelector(".webgl");

// const gui = new GUI({
//   width: 300,
//   title: "Tweaks",
//   closeFolders: true,
// });

// const scene = new THREE.Scene();
// const group = new THREE.Group();

// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// const floorMaterial = new THREE.MeshStandardMaterial();
// const floorGeo = new THREE.PlaneGeometry(15, 15, 10, 10);
// const floorMat = floorMaterial;
// floorMat.side = THREE.DoubleSide;
// const floor = new THREE.Mesh(floorGeo, floorMat);
// floor.receiveShadow = true;
// group.add(floor);
// floor.rotation.x = -Math.PI / 2; // Rotate to lie flat
// floor.position.x = -0.03;
// floor.position.y = -2.19; // Move it below objects
// floor.position.z = -1.83;

// scene.add(group);

// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// scene.add(camera);
// camera.position.x = 4.51;
// camera.position.y = 10.16;
// camera.position.z = 12;

// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });

// const controls = new OrbitControls(camera, canvas);
// controls.update();
// controls.enableDamping = true;
// controls.enablePan = false;

// renderer.setSize(sizes.width, sizes.height);

// window.addEventListener("resize", () => {
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();

//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// const dLight = new THREE.DirectionalLight("white", 2);

// scene.add(dLight);

// const ambientLight = new THREE.AmbientLight("white", 1);
// scene.add(ambientLight);

// const floorPosition = gui.addFolder("floorPosition");
// floorPosition
//   .add(floor.position, "x")
//   .min(-10)
//   .max(10)
//   .step(0.01)
//   .name("swiper");

// floorPosition
//   .add(floor.position, "y")
//   .min(-10)
//   .max(10)
//   .step(0.01)
//   .name("elevate");

// floorPosition
//   .add(floor.position, "z")
//   .min(-10)
//   .max(10)
//   .step(0.01)
//   .name("zoomer");

// const camPosition = gui.addFolder("camPosition");
// camPosition
//   .add(camera.position, "x")
//   .min(-10)
//   .max(10)
//   .step(0.01)
//   .name("swiper");

// camPosition
//   .add(camera.position, "y")
//   .min(-10)
//   .max(10)
//   .step(0.01)
//   .name("elevate");

// camPosition
//   .add(camera.position, "z")
//   .min(-10)
//   .max(10)
//   .step(0.01)
//   .name("zoomer");

// let city = null;
// let mixer = null;
// const gltfLoader = new GLTFLoader();
// gltfLoader.load("/fantasy eco/city.glb", (gltf) => {
//   scene.add(gltf.scene);
//   city = gltf.scene;
//   city.castShadow = true;
//   city.receiveShadow = true;
//   city.scale.set(8, 8, 8);
//   city.position.y = -2;

//   mixer = new THREE.AnimationMixer(gltf.scene);
//   const action = mixer.clipAction(gltf.animations[0]);
//   action.play();

//   console.log(city.animations);

//   if (gltf.animations.length > 0) {
//     const mixer = new THREE.AnimationMixer(city);
//     const action = mixer.clipAction(gltf.animations[0]); // Play first animation
//     action.play();

//     // Animate in render loop
//     function animate() {
//       requestAnimationFrame(animate);
//       mixer.update(0.016); // Adjust deltaTime as needed
//       renderer.render(scene, camera);
//     }
//     animate();
//   } else {
//     console.warn("No animations found in GLB file.");
//   }
// });

// const clock = new THREE.Clock();

// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };

// tick();

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import GUI from "lil-gui";

const canvas = document.querySelector(".webgl");

const gui = new GUI({
  width: 300,
  title: "Tweaks",
  closeFolders: true,
});

gui.hide();

const scene = new THREE.Scene();
const group = new THREE.Group();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const floorMaterial = new THREE.MeshStandardMaterial();
const floorGeo = new THREE.PlaneGeometry(15, 15, 10, 10);
const floorMat = floorMaterial;
floorMat.side = THREE.DoubleSide;
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.receiveShadow = true;
group.add(floor);
floor.rotation.x = -Math.PI / 2;
floor.position.set(-0.03, -2.19, -1.83);
scene.add(group);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.set(4.51, 10.16, 6.09);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const dLight = new THREE.DirectionalLight("white", 2);
scene.add(dLight);

const ambientLight = new THREE.AmbientLight("white", 1);
scene.add(ambientLight);

const floorPosition = gui.addFolder("floorPosition");
floorPosition.add(floor.position, "x", -10, 10, 0.01).name("swiper");
floorPosition.add(floor.position, "y", -10, 10, 0.01).name("elevate");
floorPosition.add(floor.position, "z", -10, 10, 0.01).name("zoomer");

const camPosition = gui.addFolder("camPosition");
camPosition.add(camera.position, "x", -10, 10, 0.01).name("swiper");
camPosition.add(camera.position, "y", -10, 10, 0.01).name("elevate");
camPosition.add(camera.position, "z", -10, 10, 0.01).name("zoomer");

// ✅ DRACO Loader Setup
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/"); // Use Google's CDN or your own local path

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader); // Attach DRACO loader

let city = null;
let mixer = null;

gltfLoader.load(
  "/fantasy eco/city.glb",
  (gltf) => {
    scene.add(gltf.scene);
    city = gltf.scene;
    city.castShadow = true;
    city.receiveShadow = true;
    city.scale.set(8, 8, 8);
    city.position.y = -6;

    console.log(city.animations);

    if (gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(city);
      const action = mixer.clipAction(gltf.animations[0]); // Play first animation
      action.play();
    } else {
      console.warn("No animations found in GLB file.");
    }
  },
  (xhr) => {
    console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}% completed`);
  },
  (error) => {
    console.error("Error loading GLB model:", error);
  }
);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  if (mixer) {
    mixer.update(0.016); // Update animation if available
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
