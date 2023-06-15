import { CGFobject } from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {

    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var sa=Math.sin(ang);
        var ca=Math.cos(ang);

        this.vertices.push(ca, sa, 0);
        this.vertices.push(ca, sa, this.stacks);
        
        var normal = [
            ca,
            sa,
            0
        ];

        var nsize=Math.sqrt(
            normal[0]*normal[0]+
            normal[1]*normal[1]+
            normal[2]*normal[2]
            );

        normal[0]/=nsize;
        normal[1]/=nsize;
        normal[2]/=nsize;

        this.normals.push(...normal);
        this.normals.push(...normal);

        for(var i = 0; i < this.slices; i++){
            
            if(i == this.slices - 1){
                this.indices.push(i*2, 0, i*2 + 1);
                this.indices.push(i*2 + 1, 0, 1);
                continue;
            }
            var saa=Math.sin(ang+alphaAng);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(caa, saa, 0);
            this.vertices.push(caa, saa, this.stacks);

            this.indices.push(i*2, i*2 + 2, i*2 + 1);
            this.indices.push(i*2 + 1, i*2 + 2, i*2 + 3);

            var normal = [
                caa,
                saa,
                0
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );

            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            this.normals.push(...normal);
            this.normals.push(...normal);

            ang+=alphaAng;


        }


    
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
        this.initNormalVizBuffers();
    }

}
