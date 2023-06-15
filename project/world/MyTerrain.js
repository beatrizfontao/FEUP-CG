import { CGFobject, CGFtexture, CGFappearance, CGFshader } from '../../lib/CGF.js';
import { MyPlane } from '../simple/MyPlane.js';

export class MyTerrain extends CGFobject {
    constructor(scene, maxHeight) {
        super(scene);
        this.plane = new MyPlane(scene, 20);
        this.maxHeight = maxHeight;

        this.terrainTexture = new CGFtexture(scene, "./images/terrain.jpg");
        this.terrainAppearance = new CGFappearance(scene);
        this.terrainAppearance.setTexture(this.terrainTexture);
        this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.terrainShader = new CGFshader(this.scene.gl, "./shaders/terrain.vert", "./shaders/terrain.frag");

        this.terrainAltimetry = new CGFtexture(scene, "./images/altimetry.png");
        this.terrainHeightMap = new CGFtexture(scene, "./images/heightmap_flat_2.jpg");

        this.terrainShader.setUniformsValues({ uSamplerAltimetry: 2 });
        this.terrainShader.setUniformsValues({ uSampler2: 1 });
        this.terrainShader.setUniformsValues({ maxHeight: this.maxHeight })
    }

    display() {
        this.terrainAppearance.apply();

        this.scene.setActiveShader(this.terrainShader);
        this.terrainHeightMap.bind(1);
        this.terrainAltimetry.bind(2);

        this.scene.pushMatrix();
        this.scene.translate(0, -100, 0);
        this.scene.scale(400, 400, 400);
        this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}