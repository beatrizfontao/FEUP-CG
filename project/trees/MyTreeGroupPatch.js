import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyBillBoard } from "./MyBillboard.js";

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTreeGroupPatch extends CGFobject {

    constructor(scene) {
        super(scene);
        this.initMaterials();
        this.textures = [];
        this.sizes = [];
        this.align = [];
        this.indexes = [];
        for(let i = 0; i < 9; i++){
            let n = Math.floor(Math.random() * (4 - 1) ) + 1;
            switch(n){
                case 1:
                    this.textures.push(this.treeMaterial1);
                    break;
                case 2:
                    this.textures.push(this.treeMaterial2);
                    break;
                case 3:
                    this.textures.push(this.treeMaterial3);
                    break;
            }
            this.align.push(this.getRandom());
            this.sizes.push(Math.random() * 2 + 8)
            let temp = [Math.floor(Math.random() * 2), 0, Math.floor(Math.random() * 2)];
            this.indexes.push(temp);
        }
        this.tree = new MyBillBoard(scene);
        
    }

    getRandom() {
        const random = Math.random();
        const isNegative = random < 0.5;
        const decimal = Math.random() * 1.3 + 0.3 ;
        return isNegative ? -decimal : decimal;
      }
      

    initMaterials(){
        this.treeMaterial1 = new CGFappearance(this.scene);
        this.treeMaterial1.setAmbient(1, 1, 1, 1);
        this.treeMaterial1.setDiffuse(0.9, 0.9, 0.9, 1);
        this.treeMaterial1.loadTexture("./images/billboardtree.png");
        this.treeMaterial1.setTextureWrap('REPEAT', 'REPEAT');

        this.treeMaterial2 = new CGFappearance(this.scene);
        this.treeMaterial2.setAmbient(1, 1, 1, 1);
        this.treeMaterial2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.treeMaterial2.loadTexture("./images/tree2.png");
        this.treeMaterial2.setTextureWrap('REPEAT', 'REPEAT');

        this.treeMaterial3 = new CGFappearance(this.scene);
        this.treeMaterial3.setAmbient(1, 1, 1, 1);
        this.treeMaterial3.setDiffuse(0.9, 0.9, 0.9, 1);
        this.treeMaterial3.loadTexture("./images/tree3.png");
        this.treeMaterial3.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(initX, initY, initZ){
        let spacing = 12;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                let idx = 3 * i + j;
                let x = initX + spacing * i;
                let y = initY;
                let z = initZ + spacing * j;
                if(this.indexes[idx][0] == 1){
                    x += this.align[idx]
                }
        
                if(this.indexes[idx][2] == 1){
                    z += this.align[idx]
                }

                this.scene.pushMatrix();
                this.textures[idx].apply()
                this.tree.display(x, y, z, this.sizes[idx]);
                this.scene.popMatrix();
            }
            
        }

        
    }
}
