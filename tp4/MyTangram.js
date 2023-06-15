import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
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
        this.triangleBig1 = new MyTriangleBig(this.scene, "blue");
        this.triangleBig2 = new MyTriangleBig(this.scene, "orange");
        this.triangleSmall1 = new MyTriangleSmall(this.scene, "red");
        this.triangleSmall2 = new MyTriangleSmall(this.scene, "purple");

        //Tangram Diamond Texture
        this.tangramMaterial = new CGFappearance(this.scene);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram.png');
        this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');
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
        this.tangramMaterial.apply();
        this.diamond.display();  
        this.scene.popMatrix();
    
		this.scene.pushMatrix();
        this.scene.translate(-1.82,-1,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.tangramMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(315*Math.PI/180, 0, 0, 1);
        this.scene.translate(0, -2, 0);        
        this.tangramMaterial.apply();
        this.triangleBig1.display();  
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.8, 0);
        this.scene.rotate(270*Math.PI/180, 0, 0, 1);
        this.tangramMaterial.apply();
        this.triangleBig2.display();  
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, -3.2, 0);
        this.scene.rotate(225*Math.PI/180, 0, 0, 1);
        this.tangramMaterial.apply();
        this.triangle.display();  
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1.2, 0);
        this.scene.rotate(20*Math.PI/180, 0, 0, 1);
        this.scene.translate(1, 0, 0);
        this.tangramMaterial.apply();
        this.triangleSmall1.display(); 
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 1.2, 0);
        this.scene.rotate(160*Math.PI/180, 0, 0, 1);
        this.scene.translate(1, 0, 0);        
        this.tangramMaterial.apply();
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

