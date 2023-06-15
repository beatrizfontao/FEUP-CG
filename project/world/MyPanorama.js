import { CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../simple/MySphere.js';

export class MyPanorama extends CGFobject {

    constructor(scene) {
        super(scene);
        this.panoramaMaterial = new CGFappearance(this.scene);
        this.panoramaMaterial.setAmbient(1, 1, 1, 1);
        this.panoramaMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.panoramaMaterial.loadTexture('./images/panorama4.jpg');
        this.panoramaMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.sphere = new MySphere(scene, 50, 50, true);
    }

    display(pos) {
        this.scene.pushMatrix();
        this.scene.translate(pos[0],pos[1],pos[2])
        this.scene.scale(200, 200, 200);
        this.panoramaMaterial.apply();
        
        this.sphere.display();
        this.scene.popMatrix();

    }

}
