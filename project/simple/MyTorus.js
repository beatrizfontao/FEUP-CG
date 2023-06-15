import { CGFobject } from '../../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTorus extends CGFobject {

    constructor(scene, circleRadius, tubeRadius, slices, stacks) {
        super(scene);
        this.circleRadius = circleRadius;
        this.tubeRadius = tubeRadius;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let stack = 0; stack <= this.stacks; stack++) {

            var alpha = stack * 2 * Math.PI / this.stacks;
            var cosAlpha = Math.cos(alpha)
            var sinAlpha = Math.sin(alpha)

            for (let slice = 0; slice <= this.slices; slice++) {
                var beta = slice * 2 * Math.PI / this.slices;
                var cosBeta = Math.cos(beta);
                var sinBeta = Math.sin(beta);

                var x = (this.circleRadius + this.tubeRadius * cosBeta) * cosAlpha;
                var y = this.tubeRadius * sinBeta;
                var z = (this.circleRadius + this.tubeRadius * cosBeta) * sinAlpha;

                this.vertices.push(x, y, z);

                var nx = cosBeta * cosAlpha;
                var ny = sinBeta;
                var nz = cosBeta * sinAlpha;

                this.normals.push(nx);
                this.normals.push(ny);
                this.normals.push(nz);

                let s = slice / this.slices;
                let t = stack / this.stacks;
                this.texCoords.push(s, t)
            }
        }

        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                var i0 = i * (this.slices + 1) + j;
                var i1 = i0 + 1;
                var i2 = (i + 1) * (this.slices + 1) + j;
                var i3 = i2 + 1;

                this.indices.push(i0, i1, i3);
                this.indices.push(i0, i3, i2);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
        this.initNormalVizBuffers()
    }
}
