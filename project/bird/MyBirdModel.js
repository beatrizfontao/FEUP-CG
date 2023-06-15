import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCone } from '../simple/MyCone.js';
import { MyElipse } from '../simple/MyElipse.js';
import { MySphere } from '../simple/MySphere.js';
import { MyWing } from './MyWing.js';

export class MyBirdModel extends CGFobject {

  constructor(scene) {
    super(scene);

    this.body = new MyElipse(scene, 30, 30, 0.5, 0.37, 0.375);
    this.head = new MyElipse(scene, 30, 30, 0.2, 0.15, 0.15);
    this.cone = new MyCone(scene, 30, 30);
    this.wing = new MyWing(scene);
    this.sphere = new MySphere(scene, 50, 50, false);
    this.isUp = true;
    this.angle = 0;
    this.increment = Math.PI / 150;
    this.initMaterials();
  }

  initMaterials() {
    // grayish
    this.grayMaterial = new CGFappearance(this.scene);
    this.grayMaterial.setAmbient(0.945, 0.776, 0.282, 1.0);
    this.grayMaterial.setDiffuse(0.945, 0.776, 0.282, 1.0);
    this.grayMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.grayMaterial.setShininess(10.0);

    // yellow
    this.yellowMaterial = new CGFappearance(this.scene);
    this.yellowMaterial.setAmbient(1, 0.616, 0, 1.0);
    this.yellowMaterial.setDiffuse(1, 0.616, 0, 1.0);
    this.yellowMaterial.setSpecular(1, 1, 1, 1.0);
    this.yellowMaterial.setShininess(10.0);

    // white
    this.whiteMaterial = new CGFappearance(this.scene);
    this.whiteMaterial.setAmbient(1, 1, 1, 1.0);
    this.whiteMaterial.setDiffuse(1, 1, 1, 1.0);
    this.whiteMaterial.setSpecular(1, 1, 1, 1.0);
    this.whiteMaterial.setShininess(10.0);

    this.whiteMaterial.loadTexture('images/eye_1.png');
    this.whiteMaterial.setTextureWrap('REPEAT', 'REPEAT');


    this.hatMaterial = new CGFappearance(this.scene);
    this.hatMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.hatMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.hatMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.hatMaterial.setShininess(10.0);
    this.hatMaterial.loadTexture('images/hat.png');
    this.hatMaterial.setTextureWrap('REPEAT', 'REPEAT');
  }

  display() {
    //Head
    this.scene.pushMatrix();
    this.scene.translate(0.75, 0.35, 0);
    this.grayMaterial.apply();
    this.head.display();
    this.scene.popMatrix();

    //Body
    this.scene.pushMatrix();
    this.grayMaterial.apply();
    this.body.display();
    this.scene.popMatrix();

    //Left Wing
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.translate(-0.25, 0.1, 0.31);
    this.scene.rotate(this.angle, 1, 0, 0);
    this.grayMaterial.apply();
    this.wing.display();
    this.scene.popMatrix();

    //Right Wing
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.translate(-0.25, 0.1, -0.31);
    this.scene.scale(1, 1, -1);
    this.scene.rotate(this.angle, 1, 0, 0);
    this.grayMaterial.apply();
    this.wing.display();
    this.scene.popMatrix();

    //Tail
    this.scene.pushMatrix();
    this.scene.translate(-0.36, 0.1, 0);
    this.scene.rotate(Math.PI / 2.9, 0, 0, 1);
    this.scene.scale(0.25, 0.5, 0.24);
    this.grayMaterial.apply();
    this.cone.display();
    this.scene.popMatrix();

    //Neck
    this.scene.pushMatrix();
    this.scene.translate(0.36, 0.1, 0);
    this.scene.rotate(-Math.PI / 2.9, 0, 0, 1);
    this.scene.scale(0.25, 0.5, 0.24);
    this.grayMaterial.apply();
    this.cone.display();
    this.scene.popMatrix();

    //Beak
    this.scene.pushMatrix();
    this.scene.translate(0.901, 0.35, 0);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    //this.scene.scale(0.1, 0.15, 0.1);
    this.scene.scale(0.07, 0.13, 0.09);
    this.yellowMaterial.apply();
    this.cone.display();
    this.scene.popMatrix();

    //Hat
    this.scene.pushMatrix();
    this.scene.translate(0.75, 0.45, 0);
    this.scene.scale(0.1, 0.3, 0.1);
    this.hatMaterial.apply();
    this.cone.display();
    this.scene.popMatrix();

    //Left Eye
    this.scene.pushMatrix();
    this.scene.translate(0.8, 0.4, -0.12);
    this.scene.scale(0.04, 0.04, 0.04);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.whiteMaterial.apply();
    this.sphere.display();
    this.scene.popMatrix();

    //Right Eye
    this.scene.pushMatrix();
    this.scene.translate(0.8, 0.4, 0.12);
    this.scene.scale(0.04, 0.04, 0.04);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.whiteMaterial.apply();
    this.sphere.display();
    this.scene.popMatrix();
  }

  updateAngle(velocity) {
    let upper = -Math.PI / 5;
    let lower = Math.PI / 5;
    let temp = (1 / (1 + velocity) * this.increment) + this.increment;
    if (this.isUp) {
      if (this.angle - temp < upper) {
        this.angle = upper;
        this.isUp = false;
      }
      else this.angle -= temp;
    }
    else {
      if (this.angle + temp > lower) {
        this.angle = lower;
        this.isUp = true;
      }
      else this.angle += temp;
    }
  }

}
