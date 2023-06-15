import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./world/MyPanorama.js";
import { MyBird } from "./bird/MyBird.js";
import { MyBirdEgg } from "./nest&eggs/MyBirdEgg.js";
import { MyTerrain } from "./world/MyTerrain.js";
import { MyNest } from "./nest&eggs/MyNest.js";
import { MyForest } from "./trees/MyForest.js";


/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
    this.numberOfEggs = 4;
    this.nestCoords = [-35, -74, -60];
  }

  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);

    this.panorama = new MyPanorama(this);

    this.terrain = new MyTerrain(this, 0.15);
    this.bird = new MyBird(this);
    this.forest = new MyForest(this);

    this.eggs = [];
    for (let i = 0; i < this.numberOfEggs; i++) {
      let egg = new MyBirdEgg(this, 30, 30);
      this.eggs.push(egg);
    }

    this.nest = new MyNest(this, 5, 1, 8, 30);
    //Objects connected to MyInterface
    this.displayAxis = false;

    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.enableTextures(true);

    this.setUpdatePeriod(10);
  }
  initLights() {
    //this.setGlobalAmbientLight(1.0, 1.0, 1.0, 1.0);

    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(30, -60, 15),
      vec3.fromValues(0, -60, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys() {
    var text = "Keys pressed:";
    var keysPressed = false;
    if (this.gui.isKeyPressed("KeyR")) {
      this.bird.reset();
    }
    if (this.gui.isKeyPressed("KeyW")) {
      this.bird.accelarate(0.001 * this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyS")) {
      this.bird.accelarate(-0.001 * this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyA")) {
      this.bird.turn(Math.PI / 180);
    }
    else if (this.gui.isKeyPressed("KeyD")) {
      this.bird.turn(-Math.PI / 180);
    }
    else if (this.gui.isKeyPressed("KeyP")) {
      this.bird.descend();
    }
    else if (this.gui.isKeyPressed("KeyO")) {
      this.checkEggNestCollision();
    }
    else {
      this.bird.turn(0);
    }
    if (keysPressed) console.log(text);
  }

  update(t) {
    this.checkKeys();
    this.bird.update(t, this.scaleFactor);
    if (this.bird.isDescending && this.bird.egg == null) {
      this.checkEggCollision();
    }
    for (let i = 0; i < this.eggs.length; i++) {
      this.eggs[i].scale = this.scaleFactor;
    }
    this.nest.scale = this.scaleFactor;
  }

  checkEggCollision() {
    let posXBird = this.bird.posX;
    let posYBird = this.bird.posY;
    let posZBird = this.bird.posZ;
    let margin = 15;
    for (let i = 0; i < this.eggs.length; i++) {
      let posXEgg = this.eggs[i].posX;
      let posYEgg = this.eggs[i].posY;
      let posZEgg = this.eggs[i].posZ;
      const halfSide = margin / 2;
      const xLeft = posXEgg - halfSide;
      const xRight = posXEgg + halfSide;
      const zBottom = posZEgg - halfSide;
      const zTop = posZEgg + halfSide;
      if (posYBird <= -72) {
        if (posXBird >= xLeft && posXBird <= xRight && posZBird >= zBottom && posZBird <= zTop && posYEgg + margin >= posYBird) {
          this.bird.addEgg(this.eggs[i]);
          this.eggs.splice(i, 1);
          break;
        }
      }
    }
  }

  checkEggNestCollision() {
    let posXBird = this.bird.posX;
    let posZBird = this.bird.posZ;
    let margin = 25;

    let posXNest = this.nest.posX;
    let posZNest = this.nest.posZ;

    const halfSide = margin / 2;
    const xLeft = posXNest - halfSide;
    const xRight = posXNest + halfSide;
    const zBottom = posZNest - halfSide;
    const zTop = posZNest + halfSide;

    if (posXBird >= xLeft && posXBird <= xRight && posZBird >= zBottom && posZBird <= zTop && this.bird.egg != null) {
      this.bird.drop();
    }
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    // ---- BEGIN Primitive drawing section
    this.forest.display();

    for (let i = 0; i < this.eggs.length; i++) {
      this.eggs[i].displayEgg();
    }

    this.bird.display();

    this.panorama.display(this.camera.position);
    this.terrain.display();

    this.pushMatrix();
    this.translate(this.nestCoords[0], this.nestCoords[1], this.nestCoords[2]);
    this.nest.display();
    this.popMatrix();
    // ---- END Primitive drawing section*/
  }
}
