import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyQuad } from "../simple/MyQuad.js";

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBillBoard extends CGFobject {

    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene);
    }


    display(x, y, z, scale){
        
        let toCamera = vec3.create();
        vec3.subtract(toCamera, this.scene.camera.position, [x, y, z])
        vec3.normalize(toCamera, toCamera);
        toCamera[1] = 0;
        let normal =vec3.fromValues(this.quad.normals[0],0,this.quad.normals[2]);
        const angle = Math.acos(vec3.dot(normal,toCamera));
        let rotationAxis = vec3.create();
        vec3.cross(rotationAxis, normal, toCamera);
        vec3.normalize(rotationAxis, rotationAxis)

        this.scene.pushMatrix();
        this.scene.translate(x, y, z);
        this.scene.rotate(angle,rotationAxis[0],rotationAxis[1],rotationAxis[2]);
        this.scene.scale(scale,scale,scale);
        this.scene.scale(1,2,1);
        this.quad.display();
        this.scene.popMatrix();
    }

}
