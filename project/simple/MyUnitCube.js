import {CGFobject} from '../../lib/CGF.js';
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
			//right
			0.5, -0.5, 0.5,  //0
			0.5, -0.5, -0.5, //1
			0.5, 0.5, -0.5,  //2
			0.5, 0.5, 0.5,   //3
			//top
			0.5, 0.5, 0.5,   //4
			0.5, 0.5, -0.5,  //5
			-0.5, 0.5, -0.5, //6
			-0.5, 0.5, 0.5,  //7
			//left
			-0.5, -0.5, 0.5, //8
			-0.5, -0.5, -0.5,//9
			-0.5, 0.5, -0.5, //10
			-0.5, 0.5, 0.5,  //11
			//bottom
			0.5, -0.5, 0.5,  //12
			0.5, -0.5, -0.5, //13
			-0.5, -0.5, -0.5,//14
			-0.5, -0.5, 0.5, //15
			//front
			0.5, -0.5, 0.5,  //16
			0.5, 0.5, 0.5,   //17
			-0.5, 0.5, 0.5,  //18
			-0.5, -0.5, 0.5, //19
			//back
			0.5, -0.5, -0.5, //20
			0.5, 0.5, -0.5,  //21
			-0.5, 0.5, -0.5, //22
			-0.5, -0.5, -0.5, //23
		];

		this.indices = [
			//right
			0, 3, 2,
			2, 1, 0,
			//top
			7, 6, 5,
			5, 4, 7,
			//left
			10, 11, 8,
			8, 9, 10,
			//bottom
			14, 15, 12,
			12, 13, 14,
			//front
			19, 18, 17,
			17, 16, 19,
			//back
			20, 21, 22,
			22, 23, 20,
		];

		this.normals = [
			//right
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,	
			//top
			0, -1, 0,
			0, -1, 0,		
			0, -1, 0,		
			0, -1, 0,
			//left
			1, 0, 0,
			1, 0, 0,		
			1, 0, 0,		
			1, 0, 0,
			//bottom
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			//front
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			//back
			0, 0, 1,
			0, 0, 1, 
			0, 0, 1, 
			0, 0, 1,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
        this.initNormalVizBuffers();
	}
}
