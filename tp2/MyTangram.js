import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

		this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleBig1 = new MyTriangleBig(this.scene);
        this.triangleBig2 = new MyTriangleBig(this.scene);
        this.triangleSmall1 = new MyTriangleSmall(this.scene);
        this.triangleSmall2 = new MyTriangleSmall(this.scene);
	}
	
	display() {
        let t_diamond = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            2, -1.8, 0, 1
        ];
    
		this.scene.pushMatrix();
        this.scene.translate(-1.82,-1,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(315*Math.PI/180, 0, 0, 1);
        this.scene.translate(0, -2, 0);
        this.triangleBig1.display();  
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.8, 0);
        this.scene.rotate(270*Math.PI/180, 0, 0, 1);
        this.triangleBig2.display();  
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(t_diamond);
        this.diamond.display();  
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, -3.2, 0);
        this.scene.rotate(225*Math.PI/180, 0, 0, 1);
        this.triangle.display();  
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1.2, 0);
        this.scene.rotate(20*Math.PI/180, 0, 0, 1);
        this.scene.translate(1, 0, 0);
        this.triangleSmall1.display();  
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 1.2, 0);
        this.scene.rotate(160*Math.PI/180, 0, 0, 1);
        this.scene.translate(1, 0, 0);
        this.triangleSmall2.display();  
        this.scene.popMatrix();
	}
}

