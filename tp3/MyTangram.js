import {CGFappearance, CGFobject} from '../lib/CGF.js';
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

        // Small Red Triangle 
        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(1, 0.047, 0.047, 1.0);
        this.redMaterial.setDiffuse(1, 0.047, 0.047, 1.0);
        this.redMaterial.setSpecular(1, 1, 1, 1.0);
        this.redMaterial.setShininess(10.0);

        // Small Purple Triangle
        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.setAmbient(0.671, 0.306, 0.765, 1.0);
        this.purpleMaterial.setDiffuse(0.671, 0.306, 0.765, 1.0);
        this.purpleMaterial.setSpecular(1, 1, 1, 1.0);
        this.purpleMaterial.setShininess(10.0);

        // Yellow Parallelogram
        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(1, 1, 0, 1.0);
        this.yellowMaterial.setDiffuse(1, 1, 0, 1.0);
        this.yellowMaterial.setSpecular(1, 1, 1, 1.0);
        this.yellowMaterial.setShininess(10.0);

        // Green Diamond
        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.setAmbient(0, 1, 0, 1.0);
        this.greenMaterial.setDiffuse(0, 1, 0, 1.0);
        this.greenMaterial.setSpecular(1, 1, 1, 1.0);
        this.greenMaterial.setShininess(10.0);

        // Pink Triangle
        this.pinkMaterial = new CGFappearance(this.scene);
        this.pinkMaterial.setAmbient(1, 0.616, 0.827, 1.0);
        this.pinkMaterial.setDiffuse(1, 0.616, 0.827, 1.0);
        this.pinkMaterial.setSpecular(1, 1, 1, 1.0);
        this.pinkMaterial.setShininess(10.0);

        // Big Blue Triangle
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setAmbient(0, 0.616, 1, 1.0);
        this.blueMaterial.setDiffuse(0, 0.616, 1, 1.0);
        this.blueMaterial.setSpecular(1, 1, 1, 1.0);
        this.blueMaterial.setShininess(10.0);

        // Big Orange Triangke
        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.setAmbient(1, 0.616, 0, 1.0);
        this.orangeMaterial.setDiffuse(1, 0.616, 0, 1.0);
        this.orangeMaterial.setSpecular(1, 1, 1, 1.0);
        this.orangeMaterial.setShininess(10.0);
	}
	
	display() {

        let t_diamond = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            2, -1.8, 0, 1
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(t_diamond);
        //this.greenMaterial.apply();
        this.diamond.display();  
        this.scene.popMatrix();
    
		this.scene.pushMatrix();
        this.scene.translate(-1.82,-1,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.yellowMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(315*Math.PI/180, 0, 0, 1);
        this.scene.translate(0, -2, 0);
        this.blueMaterial.apply();
        this.triangleBig1.display();  
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.8, 0);
        this.scene.rotate(270*Math.PI/180, 0, 0, 1);
        this.orangeMaterial.apply();
        this.triangleBig2.display();  
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, -3.2, 0);
        this.scene.rotate(225*Math.PI/180, 0, 0, 1);
        this.pinkMaterial.apply();
        this.triangle.display();  
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1.2, 0);
        this.scene.rotate(20*Math.PI/180, 0, 0, 1);
        this.scene.translate(1, 0, 0);
        this.redMaterial.apply();
        this.triangleSmall1.display(); 
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 1.2, 0);
        this.scene.rotate(160*Math.PI/180, 0, 0, 1);
        this.scene.translate(1, 0, 0);
        this.purpleMaterial.apply();
        this.triangleSmall2.display();  
        this.scene.popMatrix();

	}

    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangleBig1.enableNormalViz();
        this.triangleBig2.enableNormalViz();
        this.triangleSmall1.enableNormalViz();
        this.triangleSmall2.enableNormalViz();
    }

    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangleBig1.disableNormalViz();
        this.triangleBig2.disableNormalViz();
        this.triangleSmall1.disableNormalViz();
        this.triangleSmall2.disableNormalViz();
    }
}

