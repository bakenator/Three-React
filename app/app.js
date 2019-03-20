import React, { Component } from 'react'
import { render } from 'react-dom'
import autobind from 'react-autobind'
import Scene from '../scenes/scene'
import Scenes from '../models/scenes'

const sc = new Scenes()
window.SceneController = sc

var init = () => {
  // starting render loop
  sc.animate()
  sc.animations.push(() => {
      sc.renderer.render(sc.scene, sc.camera)
    })
  sc.animations.push(() => {
      sc.inputController.hoverIntersections()
    })
  init = () => {}
}

class Root extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    autobind(this)
  }

  componentDidMount () {
    init()
    window.addEventListener('resize', this.resizeRenderer)
  }

  resizeRenderer () {
    sc.camera.aspect = window.innerWidth / window.innerHeight
    sc.camera.updateProjectionMatrix()
    sc.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  render () {
    return (
      <div className={`root`}>
        <Scene sceneController={sc}/>
      </div>
    )
  }
}

render(
  <Root />,
  document.getElementById('react-root')
)
