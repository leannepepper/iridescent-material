import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import './style.css'
import { addBubbles } from './bubbles'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight)

//HDR
const hdrEquirect = new RGBELoader().load(
  'HDR/studio_garden_4k.hdr',
  function () {
    hdrEquirect.mapping = THREE.EquirectangularReflectionMapping
    // scene.background = hdrEquirect
    scene.environment = hdrEquirect
  }
)

//Loaders
const glftLoader = new GLTFLoader()

glftLoader.load('./models/Duck.gltf', gltf => {
  const duck = gltf.scene
  duck.scale.set(0.8, 0.8, 0.8)
  duck.rotateY(Math.PI + 0.5)
  duck.position.set(0, -0.5, 0)
  scene.add(duck)
})

// Bubbles

const bubble = addBubbles(hdrEquirect)
scene.add(bubble)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
