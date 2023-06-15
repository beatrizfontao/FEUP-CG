 import { CGFobject } from '../../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {

    constructor(scene, slices, stacks, isPanoram) {
        super(scene);
        this.slices = slices;
        this.stacks = 2*stacks;
        this.isPanoram = isPanoram;
        this.initBuffers();
    }

    initBuffers() {

        //horizontal(longitude) ->
        var alpha = 0;
        var alphaIncrease = 2*Math.PI/this.slices;

        //vertical(latitude) ^
        var beta = 0;
        var betaIncrease = Math.PI/this.stacks;
        var stackVert = this.slices + 1;
        

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for(let stack = 0; stack <= this.stacks; stack++){
            var sinbeta = Math.sin(beta);
            var cosbeta = Math.cos(beta)

            alpha = 0;
            for(let slice = 0; slice <= this.slices; slice++){
                var sinalpha = Math.sin(-alpha);
                var cosalpha = Math.cos(alpha);

                //Vertices
                this.vertices.push(sinbeta*cosalpha, cosbeta, sinalpha*sinbeta);
            
                //Indices
                if(stack < this.stacks && slice < this.slices) {
                    var k1 = stack * stackVert + slice;
                    var k2 = k1 + stackVert;
                    if(this.isPanoram){
                        this.indices.push(k2, k1, k1 + 1);
                        this.indices.push(k2 + 1, k2, k1 + 1);

                    }
                    else{
                        this.indices.push(k1 + 1, k1, k2);
                        this.indices.push(k1 + 1, k2, k2 + 1);
                    }
                    
                }

                if(this.isPanoram){
                    var normal = [-sinbeta*cosalpha, -cosbeta, -sinalpha*sinbeta];
                    
                    //Normals
                    this.normals.push(...normal);
                } else {
                    var normal = [sinbeta*cosalpha, cosbeta, sinalpha*sinbeta];
                
                    //Normals
                    this.normals.push(...normal);
                }
                
                //Tex coords
                let s = slice / this.slices;
                let t = stack / this.stacks;
                this.texCoords.push(s, t)

                alpha += alphaIncrease;
            }
            beta += betaIncrease;
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
        this.initNormalVizBuffers();
    }

}
