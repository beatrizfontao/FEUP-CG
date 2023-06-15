import { CGFappearance, CGFtexture, CGFobject } from "../../lib/CGF.js";
import { MyTorus } from "../simple/MyTorus.js";

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject {

    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.torus = new MyTorus(scene, 3, 1, 7, 30);
        this.bottomTorus = new MyTorus(scene, 1.5, 1.5, 2, 15);

        this.posX = -35;
        this.posY = -72;
        this.posZ = -60;

        this.scale = 1;

        this.eggs = [];

        this.nestTexture = new CGFtexture(scene, "images/nest.jpg");
        this.nestMaterial = new CGFappearance(scene);
        this.nestMaterial.setAmbient(1, 1, 1, 1);
        this.nestMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.nestMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.nestMaterial.setTexture(this.nestTexture);
        this.nestMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.scene.pushMatrix();
        this.nestMaterial.apply();
        this.scene.translate(0, -1, 0);
        this.scene.scale(this.scale, this.scale, this.scale);
        this.bottomTorus.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);
        this.torus.display();
        this.scene.popMatrix();

        if (this.eggs.length != 0) {
            this.displayEggsInNest();
        }
    }

    displayEggsInNest() {
        for (let i = 0; i < this.eggs.length; i++) {
            let x;
            if (i % 2 == 0) {
                x = -this.scale;
            } else {
                x = this.scale
            }
            let y;
            if (i < 2) {
                y = this.scale;
            } else {
                y = -this.scale;
            }
            this.eggs[i].scale = this.scale;
            this.eggs[i].displayEggInPosition(x, 0, y);
        }
    }

    addEgg(egg) {
        let i = this.eggs.length;
        this.eggs.push(egg);
    }
}
