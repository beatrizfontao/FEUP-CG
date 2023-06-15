import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyElipse extends CGFobject {

  constructor(scene, slices, stacks, xRadius, yRadius, zRadius) {
    super(scene);

    this.sphere = new MySphere(scene, slices, stacks, false);
    this.xRadius = xRadius;
    this.yRadius = yRadius;
    this.zRadius = zRadius;
  }

  display() {
    this.scene.pushMatrix();
    this.scene.scale(this.xRadius,this.yRadius,this.zRadius);
    this.sphere.display();
    this.scene.popMatrix();

    //this.sphere.enableNormalViz();
  }

}
