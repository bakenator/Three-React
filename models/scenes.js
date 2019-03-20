import * as THREE from 'three'
import InputController from './input-controller'

export default class Scenes {
  constructor () {
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000, this)
    this.scene = null
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    // setting up webgl boilerplate and our camera control lib
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.domElement.id = 'three-canvas'
    const canvasElem = document.body.appendChild(this.renderer.domElement)
    this.inputController = new InputController(this.camera)
    this.animations = []
  }

  animate () {
    requestAnimationFrame(this.animate.bind(this))
    this.animations.forEach(animation => {
      animation()
    })
  }
}
