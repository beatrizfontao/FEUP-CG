import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyBillBoard } from "./MyBillboard.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyForest extends CGFobject {

    constructor(scene) {
        super(scene);
        this.row1 = new MyTreeRowPatch(scene);
        this.row2 = new MyTreeRowPatch(scene);
        this.row3 = new MyTreeRowPatch(scene);
        this.group1 = new MyTreeGroupPatch(scene);
        this.group2 = new MyTreeGroupPatch(scene);
        this.group3 = new MyTreeGroupPatch(scene);
    }

    display(){
        this.row1.display(-110,-67,-90,-Math.PI/2);
        this.row1.display(-20,-67,-90,Math.PI/2);
        this.row2.display(30,-67,-90,Math.PI/2);
        this.row2.display(-80,-67,-110,0);
        this.group1.display(-95, -67, -15);
        this.group2.display(-10,-67, -120);
        this.row3.display(30,-67,-110,0);
        this.group3.display(50,-67, -110);
        this.group2.display(80,-67, -90);
        this.group1.display(65,-67, -60);
       this.group2.display(56,-67, -30);
        this.group3.display(65,-67, -10);
        this.row2.display(10,-67,97,-Math.PI/2);
        this.group3.display(65, -67, 50);  
        this.group2.display(45, -67, 35);  
    }
}
