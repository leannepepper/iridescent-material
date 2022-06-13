import * as THREE from 'three'

export function addBubbles (environment) {
  const params = {
    color: 0xffffff,
    transmission: 1,
    opacity: 1,
    metalness: 0,
    roughness: 0,
    ior: 1.5,
    envMapIntensity: 1,
    envMap: environment,
    side: THREE.DoubleSide,
    transparent: true
  }
  const bubble = new THREE.SphereBufferGeometry(1, 20, 20)
  const material = new THREE.MeshPhysicalMaterial(params)
  const mesh = new THREE.Mesh(bubble, material)
  return mesh
}
