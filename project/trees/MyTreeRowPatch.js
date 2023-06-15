import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyBillBoard } from "./MyBillboard.js";

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTreeRowPatch extends CGFobject {

    constructor(scene) {
        super(scene);
        this.initMaterials();
        this.textures = [];
        this.sizes = [];
        this.align = [];
        this.indexes = [];
        for(let i = 0; i < 6; i++){
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
        this.initTreeRow();
        
    }

    initTreeRow() {
        this.treesPos = [];
        let spacing = 12;
        for(let i = 0; i < 6; i++){
            let x = 0 + spacing * i;
            let y = 0;
            let z = 0;
            
            if(this.indexes[i][0] == 1){
                x += this.align[i]
            }
    
            if(this.indexes[i][2] == 1){
                z = this.align[i]
            }

            this.treesPos.push([x,y,z]);
        }
    }

    getRandom() {
        const random = Math.random();
        const isNegative = random < 0.5;
        const decimal = Math.random() * 1.3 + 0.3;
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

    display(initX, initY, initZ, angle){
        const x = initX;
        const z = initZ;
        if(angle != 0){
            for(let i = 0; i < 6; i++){
                let z1 = this.treesPos[i][2] * Math.cos(angle) - this.treesPos[i][0] * Math.sin(angle) + initX;
                let x1 = this.treesPos[i][2] * Math.sin(angle) + this.treesPos[i][0] * Math.cos(angle) + initZ;
        
                this.scene.pushMatrix();
                this.textures[i].apply();
                this.tree.display(x1, initY, z1, this.sizes[i])
                this.scene.popMatrix();
                
            }
        }
        
        else{
            for(let i = 0; i < 6; i++){
            
                this.scene.pushMatrix();
                this.textures[i].apply();
                this.tree.display(this.treesPos[i][0] + initX, this.treesPos[i][1] + initY, this.treesPos[i][2] + initZ, this.sizes[i])
                this.scene.popMatrix();
            }
        }
        
    }
}
