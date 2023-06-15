import {CGFobject} from '../../lib/CGF.js';
/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWing extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			0.5, 0, 0,	//1
			-0.25, 0.25, 0.50,	//2
			0.135, 0.25, 0.50, //3
            0.25, 0, 1.25, //4
			0, 0, 0,	//0
			0.5, 0, 0,	//1
			-0.25, 0.25, 0.50,	//2
			0.135, 0.25, 0.50, //3
            0.25, 0, 1.25, //4
			-0.25, 0.25, 0.50,	//2
			0.135, 0.25, 0.50, //3
			-0.25, 0.25, 0.50,	//2
			0.135, 0.25, 0.50, //3            
		];

		this.indices = [
			0, 1 ,2,
            2, 1, 0,
            1, 2, 3,
            3, 2, 1,
            2, 3, 4,
            4, 3, 2

		];

		this.normals = [
			0, -0.894, 0.447,
            0, -0.894, 0.447,
			0, 1, 0,
            0, 1, 0,
            -0.324, 0.972, 0.54,
			0, 0.894, -0.447,
            0, 0.894, -0.447,
            0, -1, 0,
            0, -1, 0,
            0.324, -0.972, -0.54,
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
        this.initNormalVizBuffers();

	}
}

