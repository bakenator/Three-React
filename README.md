# Three-React

Three-React is a small example template for combining Interactive Three JS elements with React.  The gif below shows a user hovering on Three JS cubes, triggering a react popup, then using the popup to alter the color of the 3d cube.

![Three-React](https://raw.githubusercontent.com/bakenator/Three-React/master/hover-block.gif)

## Instructions to Run:

1. Run `npm install`
2. Build with parcel.  Run `npm install -g parcel-bundler`, then `parcel index.html`
3. Start a server, run `cd dist && python -m SimpleHTTPServer 8080`
4. View the page at http://localhost:8080

## ThreeJS Template:
The ThreeJS scene creation used for this project is copied from the ThreeJS example 'WebGL Interactive Cubes'
Demo: https://threejs.org/examples/webgl_interactive_cubes.html
Source: https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_cubes.html
