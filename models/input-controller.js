import * as THREE from 'three'

export default class InputController {
  constructor (camera) {
    window.onmousemove = this.onMouseMove.bind(this)

    this.INTERSECTED = null
    this.mouse = new THREE.Vector2()
    this.screenMouse = { x: 0, y: 0 }

    this.camera = camera
    this.raycaster = new THREE.Raycaster()
    this._intersectGroup = []
    this.hoverSubscribers = []
  }

  on (event, handler, subscriberParams) {
    switch (event) {
      case 'hover':
        const hoverWrapper = (...args) => {
          args = [].slice.call(args)
          const event = args[1] || {}
          const { x, y } = event.screenMouse
          const hoveredElem = document.elementFromPoint(x, y) || {}
          const canvasElem = document.getElementById('three-canvas')
          const hoveredCanvas = hoveredElem.id === canvasElem.id
          if (hoveredCanvas) {
            handler(...args)
          }
        }
        this.addHoverSubscriber(hoverWrapper, subscriberParams)
        break
    }
  }

  addHoverSubscriber (handler, { getIntersectGroup }) {
    this.hoverSubscribers.push({ handler, getIntersectGroup })
  }

  getKeyState () {
    const screenMouseState = { x: this.screenMouse.x, y: this.screenMouse.y }
    return {
      screenMouse: screenMouseState
    }
  }

  onMouseMove (event) {
    // mouse is transformed to a -1 t0 1 scale for webGL instersection calculation
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    // screenMouse used for page coordinates
    this.screenMouse = { x: event.clientX, y: event.clientY }
  }

  hoverIntersections () {
    this.hoverSubscribers.forEach(({ getIntersectGroup, handler }, index) => {
      const intersects = this.getIntersectObjects(getIntersectGroup())
      if (intersects.length <= 0) {
        handler(null, this.getKeyState())
        return
      }
      handler(intersects[0].object, this.getKeyState())
    })
  }

  getIntersectObjects (intersectGroup) {
    // if intersection found, set this.INTERSECTED as object
    this.raycaster.setFromCamera(this.mouse, this.camera)
    return this.raycaster.intersectObjects(intersectGroup)
  }
}
