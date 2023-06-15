import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0.5, 0.5, 0.5,	 //0
			0.5, -0.5, 0.5,	 //1
			-0.5, -0.5, 0.5, //2
			-0.5, 0.5, 0.5,	 //3
			0.5, 0.5, -0.5,	 //4
			0.5, -0.5, -0.5, //5
			-0.5, -0.5, -0.5,//6
			-0.5, 0.5, -0.5, //7

		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,  // xy front
			0, 3, 2,  // xy front  
			4, 5, 6,// xy back  
			4, 6, 7,  // xy back  
            4, 3, 0, // xz up
            4, 7, 3, // xz up
            5, 1, 2, // xz down
            5, 2, 6, // xz down
            4, 0, 5, // yz right
            0, 1, 5, // yz right
            6, 3, 7, // yz left
            6, 2, 3, // yz left

            
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

