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
		/*
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
            4, 3, 0, // xz up\
            4, 7, 3, // xz up
            5, 1, 2, // xz down
            5, 2, 6, // xz down
            4, 0, 5, // yz right
            0, 1, 5, // yz right
            6, 3, 7, // yz left
            6, 2, 3, // yz left
		];
		*/
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
			2, 3, 0,
			0, 1, 2,
			//top
			5, 6, 7,
			7, 4, 5,
			//left
			8, 11, 10,
			10, 9, 8,
			//bottom
			12, 15, 14,
			14, 13, 12,
			//front
			17, 18, 19,
			19, 16, 17,
			//back
			22, 21, 20,
			20, 23, 22,
		];

		this.normals = [
			//right
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,	
			//top
			0, 1, 0,
			0, 1, 0,		
			0, 1, 0,		
			0, 1, 0,
			//left
			-1, 0, 0,
			-1, 0, 0,		
			-1, 0, 0,		
			-1, 0, 0,
			//bottom
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			//front
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			//back
			0, 0, -1,
			0, 0, -1, 
			0, 0, -1, 
			0, 0, -1,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
        this.initNormalVizBuffers();
	}
}
