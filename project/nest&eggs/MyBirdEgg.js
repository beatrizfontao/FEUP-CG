import { CGFobject, CGFappearance } from '../../lib/CGF.js';
/**
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdEgg extends CGFobject {

    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = 2 * stacks;
        this.posX = 0;
        this.posY = -74.5;
        this.posZ = 0;
        this.isDescending = false;
        this.isInBird = false;

        this.angleX = 0;
        this.angleZ = 0;

        this.scale = 1;

        this.initBuffers();
        this.initMaterials();
    }

    initMaterials() {
        this.eggMaterial = new CGFappearance(this.scene);
        this.eggMaterial.setAmbient(1, 1, 1, 1);
        this.eggMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eggMaterial.loadTexture('./images/egg.jpg');
        this.eggMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    initBuffers() {
        this.angleX = this.xRot = Math.random() * 2 - 1;
        this.angleZ = this.xRot = Math.random() * 2 - 1;
        this.defineCoords();

        //horizontal(longitude) ->
        var alpha = 0;
        var alphaIncrease = 2 * Math.PI / this.slices;

        //vertical(latitude) ^
        var beta = 0;
        var betaIncrease = Math.PI / this.stacks;
        var stackVert = this.slices + 1;


        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let stack = 0; stack <= this.stacks; stack++) {
            var sinbeta = Math.sin(beta);
            if (stack < this.stacks / 2) {
                var cosbeta = Math.cos(beta) * 1.5;
            }
            else {
                var cosbeta = Math.cos(beta);
            }

            alpha = 0;
            for (let slice = 0; slice <= this.slices; slice++) {
                var sinalpha = Math.sin(-alpha);
                var cosalpha = Math.cos(alpha);

                //Vertices
                this.vertices.push(sinbeta * cosalpha, cosbeta, sinalpha * sinbeta);

                //Indices
                if (stack < this.stacks && slice < this.slices) {
                    var k1 = stack * stackVert + slice;
                    var k2 = k1 + stackVert;
                    this.indices.push(k1 + 1, k1, k2);
                    this.indices.push(k1 + 1, k2, k2 + 1);

                }
                var normal = [sinbeta * cosalpha, cosbeta, sinalpha * sinbeta];

                //Normals
                this.normals.push(...normal);

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

    displayEgg() {
        this.scene.pushMatrix();
        this.eggMaterial.apply();
        this.scene.translate(this.posX, this.posY, this.posZ);
        this.scene.scale(this.scale*0.5, this.scale*0.5, this.scale*0.5);
        if(!this.isInBird && !this.isDescending){
            this.scene.rotate(Math.PI/3, this.angleX, 0, this.angleZ);
        }
        this.display();
        this.scene.popMatrix();
    }

    displayEggInPosition(posX, posY, posZ) {
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
        this.displayEgg();
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    placeEggInNest() {
        this.isDescending = false;
    }

    defineCoords(){
        let x1 = this.getRndInteger(-83, -20);   
        let z1 = this.getRndInteger(-80, -30);   

        let x2 = this.getRndInteger(-40, 10);
        let z2 = this.getRndInteger(20, 83);

        if(this.getRndInteger(1,3) == 1){
            this.posX = x1;
            this.posZ = z1;
        }
        else{
            this.posX = x2;
            this.posZ = z2;
        }
    }
}
