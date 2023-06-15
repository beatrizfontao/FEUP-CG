import { CGFobject , CGFappearance} from '../../lib/CGF.js';
import { MyBirdModel } from './MyBirdModel.js';

export class MyBird extends CGFobject {

  constructor(scene) {
    super(scene);
    this.posX = 0;
    this.posY = 0;
    this.posZ = 0;
    this.velocity = 0;
    this.angle = 0;
    this.scale = 1;
    this.isDescending = false;
    this.initPos = 0;
    this.progress = 4.5*2*10 / 1000;

    this.droppingTime = 0;

    this.bird = new MyBirdModel(scene);

  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(this.posX, this.posY, this.posZ);
    this.scene.rotate(this.angle, 0, 1, 0);
    this.scene.scale(this.scale, this.scale, this.scale);
    this.bird.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(this.posX, this.posY, this.posZ);
    if (this.egg != null && !this.egg.isDescending) {
      this.egg.displayEggInPosition(0, -this.scale, 0);
    }
    this.scene.popMatrix();

    if (this.egg != null && this.egg.isDescending) {
      console.log("egg pos: " + this.egg.posY);
      this.egg.displayEggInPosition(this.egg.posX, this.egg.posY, this.egg.posZ);
    }
  }

  update(t, s) {
    this.posX += Math.cos(this.angle) * this.velocity;
    this.posZ -= Math.sin(this.angle) * this.velocity;
    let heigh = 72;
    if (this.isDescending) {
      if (this.posY <= -heigh) {
        this.posY = -heigh;
        this.isDescending = false;
        this.isAscending = true;
      }
      else {
        this.posY -= heigh * this.progress;
      }
    }
    else if (this.isAscending) {
      if (this.posY > this.initPos) {
        this.posY = Math.sin(Math.PI * t / 500) - 70;
        this.isDescending = false;
        this.isAscending = false;
      }
      else {
        this.posY += heigh * this.progress;
      }
    }
    else {
      this.posY = Math.sin(Math.PI * t / 500) - 70;
    }
    this.bird.updateAngle(this.velocity);
    this.scale = s;
    this.updateDroppingEgg(t/50000000)
  }

  updateDroppingEgg(t) {
    if (this.egg != null && this.egg.isDescending) {
      let nest_height = -72;

      if (this.egg.posY <= nest_height) {
        this.scene.nest.addEgg(this.egg);
        this.droppingTime = 0;
        this.egg = null;
      } else {
        //this.egg.posY -= 0.15; //drop vertically
        let x, y, z;
        this.droppingTime += t/5000000;
        [x, y, z] = this.parabola(this.droppingTime);
        this.egg.posX += x;
        this.egg.posY += y;
        this.egg.posZ += z; 
      }
    }
  }

  parabola(t){
    let z = this.velocity * Math.cos(this.angle);
    let x = this.velocity * Math.cos(this.angle);
    let y = this.velocity/4 * Math.sin(this.angle) - t;
    return [x, y, z];
  }

  addEgg(egg) {
    this.egg = egg;
    this.egg.isInBird = true;
    this.egg.posY = this.posY;
  }

  turn(v) {
    this.angle += v;
  }

  descend() {
    this.initPos = this.posY;
    this.isDescending = true;
  }

  drop() {
    if (this.egg != null) {
      this.egg.posX = this.posX;
      this.egg.posY = this.posY;
      this.egg.posZ = this.posZ;
      this.egg.isDescending = true;
      this.egg.isInBird = false;
    }
  }

  removeEgg() {
    this.egg = null;
  }

  accelarate(v) {
    this.velocity += v;
    if (this.velocity < 0) {
      this.velocity = 0;
    }
  }

  reset() {
    this.posX = 0;
    this.posZ = 0;
    this.velocity = 0;
    this.angle = 0;
  }
}
