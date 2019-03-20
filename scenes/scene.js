import React, { Component } from 'react'
import autobind from 'react-autobind'
import SceneModel from './scene-model'
import * as THREE from 'three'

export default class Scene extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hoveredObject: null,
      position: {x: 0, y: 0}
    }

    autobind(this)
  }

  componentDidMount () {
    const { sceneController } = this.props
    this.start3dScene()
    sceneController.inputController.on('hover', this.onHover, {
      getIntersectGroup: this.getHoverGroup
    })
  }

  componentDidUpdate (prevProps) {

  }

  start3dScene () {
    const { sceneController} = this.props
    this.scene = new SceneModel()
    // setting which 3d scene is used in renderer
    sceneController.scene = this.scene
  }

  getHoverGroup() {
    return this.scene.children
  }

  onHover(object, keyState) {
    const {hoveredObject} = this.state
    if (hoveredObject === object) {
      return
    }
    this.setState({
      hoveredObject: object,
      position: keyState.screenMouse
    })
  }

  changeColor(hoveredObject) {
    if (!hoveredObject) {
      return
    }

    const hexColor = Math.random() * 0xffffff
    hoveredObject.material = new THREE.MeshLambertMaterial( { color: hexColor } )
    // hoveredObject.material.color = hexColor
    hoveredObject.hexColor = hexColor
    this.setState({hoveredObject})
  }

  render () {
    const { hoveredObject, position } = this.state

    const style = {
      left: position.x - 10,
      top: position.y - 10
    }
    let colorHex;
    if (hoveredObject) {
      colorHex = Math.round(hoveredObject.hexColor).toString(16)
    }

    return (
      <div className="scene">
         {hoveredObject && 
            <div className="popup" style={style}>
              <div className="text-row">
                Hovered Block Color: 
                <div 
                  className="color-block" 
                  style={{backgroundColor: colorHex}}
                />
              </div>
              <button onClick={() => this.changeColor(hoveredObject)}>Change Block Color</button>
            </div>}
      </div>
    )
  }
}
