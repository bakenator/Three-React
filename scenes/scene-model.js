import * as THREE from 'three'

export default class SceneModel extends THREE.Scene {
	constructor() {
		super()
		this.background = new THREE.Color( 0xf0f0f0 );
		var light = new THREE.DirectionalLight( 0xffffff, 1 );
		light.position.set( 1, 1, 1 ).normalize();
		this.add( light );
		var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
		for ( var i = 0; i < 2000; i ++ ) {
			var hexColor = Math.random() * 0xffffff
			var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: hexColor } ) );
			object.hexColor = hexColor
			object.position.x = Math.random() * 800 - 400;
			object.position.y = Math.random() * 800 - 400;
			object.position.z = Math.random() * 800 - 400;
			object.rotation.x = Math.random() * 2 * Math.PI;
			object.rotation.y = Math.random() * 2 * Math.PI;
			object.rotation.z = Math.random() * 2 * Math.PI;
			object.scale.x = Math.random() + 0.5;
			object.scale.y = Math.random() + 0.5;
			object.scale.z = Math.random() + 0.5;
			this.add( object );
		}
	}
}
